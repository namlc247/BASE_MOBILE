import {
	KeyHelper,
	SessionBuilder,
	SessionCipher,
	SignalProtocolAddress,
} from '@privacyresearch/libsignal-protocol-typescript';

import { SignalProtocolStore } from './signal-store';
import { BaseService } from '../appService/baseService';
import BufferUtil from '../../utils/bufferUtil';
import { DocumentPickerAsset } from 'expo-document-picker';
import FileUtils from '../../utils/fileUtils';

function stringToArrayBuffer(str: string): ArrayBuffer {
	return Buffer.from(str, 'utf-8').buffer.slice(0);
}

function arrayBufferToString(buffer: ArrayBuffer): string {
	return Buffer.from(buffer).toString('utf-8');
}

export class SignalService extends BaseService {
	private static instance: SignalService;
	localStore = new SignalProtocolStore();
	private decryptedCache = new Map<string, string>();
	private decryptedBufferCache = new Map<string, ArrayBuffer>();
	private preKeyCache: Map<string, any> = new Map();
	private messageCache = new Map<number, string>();

	private constructor() {
		super();
	}

	public static getInstance(): SignalService {
		if (!SignalService.instance) {
			SignalService.instance = new SignalService();
		}
		return SignalService.instance;
	}

	async generatePreKeyBundle(isChangeKey = true): Promise<any> {
		if (isChangeKey) {
			this.localStore.removeAllSessions('');
		}

		const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
		const registrationId = 1;
		const preKeyId = 1;
		const preKey = await KeyHelper.generatePreKey(preKeyId);
		const signedPreKeyId = 1;
		const signedPreKey = await KeyHelper.generateSignedPreKey(
			identityKeyPair,
			signedPreKeyId
		);

		// Lưu vào store cục bộ (chỉ phía client)
		if (isChangeKey) {
			this.localStore.put('identityKey', identityKeyPair);
			this.localStore.put('registrationId', registrationId);
			this.localStore.storePreKey(preKeyId, preKey.keyPair);
			this.localStore.storeSignedPreKey(
				signedPreKeyId,
				signedPreKey.keyPair
			);
		}

		return {
			registrationId,
			identityKey: this.arrayBufferToBase64(identityKeyPair.pubKey),
			identityKeyPriv: this.arrayBufferToBase64(identityKeyPair.privKey),
			preKey: {
				keyId: preKey.keyId,
				pubKey: this.arrayBufferToBase64(preKey.keyPair.pubKey),
				privKey: this.arrayBufferToBase64(preKey.keyPair.privKey),
			},
			signedPreKey: {
				keyId: signedPreKey.keyId,
				pubKey: this.arrayBufferToBase64(signedPreKey.keyPair.pubKey),
				signature: this.arrayBufferToBase64(signedPreKey.signature),
				privKey: this.arrayBufferToBase64(signedPreKey.keyPair.privKey),
			},
		};
	}

	async generatePreKeyBundleForUser(userId: number, isChangeKey = true) {
		const preKeyBundle = await this.generatePreKeyBundle(isChangeKey);

		const jsonString = JSON.stringify(preKeyBundle);
		const base64Encoded = BufferUtil.btoaBuffer(jsonString);

		return this.uploadPreKey(userId.toString(), base64Encoded);
	}

	setKeyBundle(keyBundleFromServer: any) {
		this.localStore.removeAllSessions('');
		const keyBundle = this.base64ToObj(keyBundleFromServer); // parse thành objec

		// Lưu vào store cục bộ (chỉ phía client)
		this.localStore.put('identityKey', {
			pubKey: this.base64ToArrayBuffer(keyBundle.identityKey),
			privKey: this.base64ToArrayBuffer(keyBundle.identityKeyPriv),
		});
		this.localStore.put('registrationId', keyBundle.registrationId);
		this.localStore.storePreKey(keyBundle.preKey.keyId, {
			pubKey: this.base64ToArrayBuffer(keyBundle.preKey.pubKey),
			privKey: this.base64ToArrayBuffer(keyBundle.preKey.privKey),
		});
		this.localStore.storeSignedPreKey(keyBundle.signedPreKey.keyId, {
			pubKey: this.base64ToArrayBuffer(keyBundle.signedPreKey.pubKey),
			privKey: this.base64ToArrayBuffer(keyBundle.signedPreKey.privKey),
		});
	}

	async hasSessionWith(userId: string): Promise<boolean> {
		const address = new SignalProtocolAddress(userId, 1);
		const session = await this.localStore.loadSession(address.getName());
		return !!session;
	}

	async buildSession(remoteUserId: string, preKeyBundleFromServer: any) {
		const address = new SignalProtocolAddress(
			remoteUserId,
			preKeyBundleFromServer.registrationId
		);

		await this.localStore.saveIdentity(
			address.toString(),
			this.base64ToArrayBuffer(preKeyBundleFromServer.identityKey)
		);

		const sessionBuilder = new SessionBuilder(this.localStore, address);

		const bundle = {
			identityKey: this.base64ToArrayBuffer(
				preKeyBundleFromServer.identityKey
			),
			registrationId: preKeyBundleFromServer.registrationId,
			preKey: {
				keyId: preKeyBundleFromServer.preKey.keyId,
				publicKey: this.base64ToArrayBuffer(
					preKeyBundleFromServer.preKey.pubKey
				),
			},
			signedPreKey: {
				keyId: preKeyBundleFromServer.signedPreKey.keyId,
				publicKey: this.base64ToArrayBuffer(
					preKeyBundleFromServer.signedPreKey.pubKey
				),
				signature: this.base64ToArrayBuffer(
					preKeyBundleFromServer.signedPreKey.signature
				),
			},
		};

		await sessionBuilder.processPreKey(bundle);
	}

	async ensureSessionWith(userId: string): Promise<boolean> {
		if (!this.preKeyCache.has(userId)) {
			try {
				const bundleRes = await this.getPreKey(userId);
				let base64String = bundleRes?.data?.key_signal;

				if (!base64String) {
					const req = this.generatePreKeyBundleForUser(
						Number(userId),
						false
					);

					const res = await req;
					base64String = res?.data?.key_signal;

					if (!base64String) {
						return false;
					}
				}

				const key_signal = this.base64ToObj(base64String);

				if (key_signal) {
					this.preKeyCache.set(userId, key_signal); // ✅ Lưu lại để dùng sau
				}
			} catch (error) {
				console.error('Error fetching preKey:', error);
				return false;
			}
		}

		const bundle = this.preKeyCache.get(userId);
		if (bundle) {
			await this.buildSession(userId, bundle); // ✅ Luôn build lại để tạo type = 3
		}

		return true;
	}

	/**
	 * Mã hóa tin nhắn bằng session đã được thiết lập trước đó
	 */
	async encryptMessage(remoteUserId: string, plaintext: string) {
		let ciphertext;

		try {
			const address = new SignalProtocolAddress(remoteUserId, 1);
			const sessionCipher = new SessionCipher(this.localStore, address);
			const plaintextBuffer = stringToArrayBuffer(plaintext);
			ciphertext = await sessionCipher.encrypt(plaintextBuffer);

			if (!ciphertext?.body) {
				return '';
			}

			const buffer = this.binaryStringToArrayBuffer(ciphertext.body);
			ciphertext.body = this.arrayBufferToBase64(buffer);
		} catch (error) {
			console.error(`Failed to encrypt message :`, error);
		} finally {
			return ciphertext;
		}
	}

	async hashMessage(buffer: ArrayBuffer): Promise<string> {
		try {
			const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			return hashArray
				.map((b) => b.toString(16).padStart(2, '0'))
				.join(''); // hex string
		} catch (error) {
			console.error('Error hashing message:', error);
			return '';
		}
	}

	async decryptMessage(
		senderId: string,
		ciphertext: any,
		itemChatId: number
	) {
		const address = new SignalProtocolAddress(senderId, 1);

		let body: ArrayBuffer;
		let hash: string;

		try {
			// 👇 Xử lý ciphertext.body
			if (ciphertext.body instanceof ArrayBuffer) {
				body = ciphertext.body;
			} else if (typeof ciphertext.body === 'string') {
				body = this.base64ToArrayBuffer(ciphertext.body);
			} else {
				console.error(`❌ Unknown ciphertext body format`);
				return '';
			}

			// hash = await this.hashMessage(body);

			// // 👇 Tránh decrypt lặp lại (Bad MAC)
			// if (this.decryptedCache.has(hash)) {
			// 	return this.decryptedCache.get(hash)!;
			// }

			if (this.messageCache.has(itemChatId)) {
				return this.messageCache.get(itemChatId)!;
			}

			// 👇  Tạo sessionCipher khi body đã sẵn sàng
			const sessionCipher = new SessionCipher(this.localStore, address);

			// 👇  Decrypt
			let plaintext: ArrayBuffer;

			if (ciphertext.type === 3) {
				plaintext = await sessionCipher.decryptPreKeyWhisperMessage(
					body,
					'binary'
				);
			} else {
				plaintext = await sessionCipher.decryptWhisperMessage(
					body,
					'binary'
				);
			}

			const decoded = arrayBufferToString(plaintext);
			this.messageCache.set(itemChatId, decoded);

			return decoded;
		} catch (error) {
			console.error(`❌ Failed to decrypt message: ${error}`);
			return '';
		} finally {
		}
	}

	async generateAESKey() {
		const aesKey = await crypto.subtle.generateKey(
			{ name: 'AES-GCM', length: 256 },
			true,
			['encrypt', 'decrypt']
		);

		const rawAesKey = await crypto.subtle.exportKey('raw', aesKey); // ArrayBuffer

		return rawAesKey;
	}

	async encryptTextWithAES(plaintext: string, rawAesKey: ArrayBuffer) {
		// 1. Import raw AES key
		const aesKey = await crypto.subtle.importKey(
			'raw',
			rawAesKey,
			'AES-GCM',
			false,
			['encrypt']
		);

		// 2. Chuyển text thành Uint8Array bằng Buffer
		const plaintextBytes = Uint8Array.from(Buffer.from(plaintext, 'utf-8'));

		// 3. Tạo IV (12 bytes cho GCM)
		const iv = crypto.getRandomValues(new Uint8Array(12));

		// 4. Mã hóa
		const ciphertext = await crypto.subtle.encrypt(
			{ name: 'AES-GCM', iv },
			aesKey,
			plaintextBytes
		);

		return {
			ciphertext, // ArrayBuffer
			iv: Array.from(iv), // Array để truyền kèm khi giải mã
		};
	}

	async decryptTextWithAES(
		ciphertext: ArrayBuffer,
		iv: number[],
		rawAesKey: ArrayBuffer
	): Promise<string> {
		try {
			const aesKey = await crypto.subtle.importKey(
				'raw',
				rawAesKey,
				'AES-GCM',
				false,
				['decrypt']
			);

			const plaintextBuffer = await crypto.subtle.decrypt(
				{ name: 'AES-GCM', iv: new Uint8Array(iv) },
				aesKey,
				ciphertext
			);

			// Giải mã về string bằng Buffer
			return Buffer.from(new Uint8Array(plaintextBuffer)).toString(
				'utf-8'
			);
		} catch (error) {
			console.error(`Failed to decryptTextWithAES:`, error);
			return '';
		}
	}

	async encryptAES(file: DocumentPickerAsset, key?: ArrayBuffer) {
		// 1. Đọc file thành ArrayBuffer
		const arrayBuffer = await FileUtils.getArrayBuffer(file.uri);

		// 2. Tạo AES-256-GCM key
		let aesKey;

		let rawAesKey: ArrayBuffer;

		if (key) {
			aesKey = await crypto.subtle.importKey(
				'raw',
				key,
				'AES-GCM',
				false,
				['encrypt']
			);
			rawAesKey = key; // ✅ dùng lại key truyền vào
		} else {
			aesKey = await crypto.subtle.generateKey(
				{ name: 'AES-GCM', length: 256 },
				true,
				['encrypt', 'decrypt']
			);
			rawAesKey = await crypto.subtle.exportKey('raw', aesKey);
		}

		// 3. Mã hóa file bằng AES
		const iv = crypto.getRandomValues(new Uint8Array(12)); // GCM cần IV 12 byte
		const encryptedFile = await crypto.subtle.encrypt(
			{ name: 'AES-GCM', iv },
			aesKey,
			arrayBuffer
		);

		return {
			rawAesKey, //  AES key để gửi đi
			encryptedFile, // Mã hóa bằng AES-GCM
			iv: Array.from(iv), // IV cần để giải mã AES
			fileName: file.name.replace(/\.[^/.]+$/, '') + '.enc',
			// mimeType: file.type,
		};
	}

	async decryptAES(
		keyBuffer: ArrayBuffer,
		encryptedFile: ArrayBuffer,
		iv: number[]
	) {
		const aesKey = await crypto.subtle.importKey(
			'raw',
			keyBuffer,
			'AES-GCM',
			false,
			['decrypt']
		);

		const decryptedFile = await crypto.subtle.decrypt(
			{ name: 'AES-GCM', iv: new Uint8Array(iv) },
			aesKey,
			encryptedFile
		);

		return decryptedFile; // ArrayBuffer → bạn có thể tạo Blob hoặc save
	}

	async encryptArrayBuffer(remoteUserId: string, arrayBuffer: ArrayBuffer) {
		let cipher;

		try {
			const address = new SignalProtocolAddress(remoteUserId, 1);
			const sessionCipher = new SessionCipher(this.localStore, address);
			cipher = await sessionCipher.encrypt(arrayBuffer);

			if (!cipher?.body) {
				return '';
			}

			const buffer = this.binaryStringToArrayBuffer(cipher.body);
			cipher.body = this.arrayBufferToBase64(buffer);
		} catch (error) {
			console.error(`Failed to encrypt ArrayBuffer:`, error);
		} finally {
			return cipher;
		}
	}

	async decryptToArrayBuffer(senderId: string, cipher: any) {
		const address = new SignalProtocolAddress(senderId, 1);

		let body: ArrayBuffer | undefined;
		let hash: string;

		try {
			// 👇 Xử lý ciphertext.body
			if (cipher.body instanceof ArrayBuffer) {
				body = cipher.body;
			} else if (typeof cipher.body === 'string') {
				body = this.base64ToArrayBuffer(cipher.body);
			} else {
				console.error(`❌ Unknown ciphertext body format`);
			}

			if (!body) {
				console.error('❌ body is undefined');
				return null;
			}

			hash = await this.hashMessage(body);

			// 👇 Tránh decrypt lặp lại (Bad MAC)
			if (this.decryptedBufferCache.has(hash)) {
				return this.decryptedBufferCache.get(hash)!;
			}

			// 👇  Tạo sessionCipher khi body đã sẵn sàng
			const sessionCipher = new SessionCipher(this.localStore, address);

			// 👇  Decrypt
			let plaintext: ArrayBuffer;

			if (cipher.type === 3) {
				plaintext = await sessionCipher.decryptPreKeyWhisperMessage(
					body,
					'binary'
				);
			} else {
				plaintext = await sessionCipher.decryptWhisperMessage(
					body,
					'binary'
				);
			}

			this.decryptedBufferCache.set(hash, plaintext);

			return plaintext;
		} catch (error) {
			console.error(`❌ Failed to decrypt ArrayBuffer :`, error);
			return null;
		} finally {
		}
	}

	base64ToObj(base64String: string): any {
		const jsonString = Buffer.from(base64String, 'base64').toString(
			'utf-8'
		);
		return JSON.parse(jsonString);
	}

	objToBase64(obj: any): string {
		const jsonString = JSON.stringify(obj);
		return Buffer.from(jsonString, 'utf-8').toString('base64');
	}

	binaryStringToArrayBuffer(binaryStr: string): ArrayBuffer {
		const len = binaryStr.length;
		const buffer = new ArrayBuffer(len);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < len; i++) {
			view[i] = binaryStr.charCodeAt(i); // mỗi ký tự là 1 byte
		}
		return buffer;
	}

	arrayBufferToBase64(buffer: ArrayBuffer): string {
		return Buffer.from(buffer).toString('base64');
	}

	base64ToArrayBuffer(base64: string): ArrayBuffer {
		const binaryStr = Buffer.from(base64, 'base64').toString('binary');
		const len = binaryStr.length;
		const buffer = new ArrayBuffer(len);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < len; i++) {
			view[i] = binaryStr.charCodeAt(i);
		}
		return buffer;
	}

	uploadPreKey(userId: string, key_signal: string) {
		return this.postData('/signal/uploadPreKey', {
			userId: userId,
			key_signal: key_signal,
		});
	}

	getPreKey(userId: string) {
		return this.postData('/signal/getPreKey', {
			userId: userId,
		});
	}
}
