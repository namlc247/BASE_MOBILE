import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Subject } from 'rxjs';
import moment from 'moment';
import MyToastUtils from '../../../utils/toastConfig';

interface RecordedAudioOutput {
	blob: Blob;
	title: string;
}

export class AudioRecordingStreamService {
	private static instance: AudioRecordingStreamService;
	private recording: Audio.Recording | null = null;
	private interval: NodeJS.Timeout | null = null;
	private chunkInterval: NodeJS.Timeout | null = null;
	private startTime: moment.Moment | null = null;
	private _recorded = new Subject<RecordedAudioOutput>();
	private _recordingTime = new Subject<string>();
	private _recordingFailed = new Subject<string>();
	private message = new Subject<string>();
	private isRecording = false;
	private lastPosition = 0;
	private audioFileUri = '';

	private currentSound: Audio.Sound | null = null;
	private onAudioFinishedCallback: (() => void) | null = null;

	private constructor() {}

	public static getInstance(): AudioRecordingStreamService {
		if (!AudioRecordingStreamService.instance) {
			AudioRecordingStreamService.instance =
				new AudioRecordingStreamService();
		}
		return AudioRecordingStreamService.instance;
	}

	getMessage() {
		return this.message.asObservable();
	}

	getRecordedBlob() {
		return this._recorded.asObservable();
	}

	getRecordedTime() {
		return this._recordingTime.asObservable();
	}

	recordingFailed() {
		return this._recordingFailed.asObservable();
	}

	getAudioFileUri(): string {
		return this.audioFileUri;
	}

	async startRecording(
		callback?: (blob: Blob, file: File) => void
	): Promise<void> {
		try {
			if (this.isRecording) return;

			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			const { status } = await Audio.requestPermissionsAsync();
			if (status !== 'granted') {
				this._recordingFailed.next('Permission denied');
				return;
			}

			this.recording = new Audio.Recording();
			await this.recording.prepareToRecordAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);

			this.audioFileUri = this.recording.getURI() || '';
			await this.recording.startAsync();

			this.isRecording = true;
			this.startTime = moment();
			this.lastPosition = 0;
			this._recordingTime.next('00:00');

			// Update recording time
			this.interval = setInterval(() => {
				if (this.startTime) {
					const diff = moment().diff(this.startTime);
					const duration = moment.utc(diff).format('mm:ss');
					this._recordingTime.next(duration);
				}
			}, 1000);
		} catch (error) {
			this.handleError(error);
		}
	}

	// private base64ToBytes(base64: string): Uint8Array {
	// 	const binaryString = this.base64ToBinaryString(base64);
	// 	const bytes = new Uint8Array(binaryString.length);
	// 	for (let i = 0; i < binaryString.length; i++) {
	// 		bytes[i] = binaryString.charCodeAt(i);
	// 	}
	// 	return bytes;
	// }

	// private base64ToBinaryString(base64: string): string {
	// 	const chars =
	// 		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// 	let result = '';
	// 	let i = 0;

	// 	while (i < base64.length) {
	// 		const char1 = chars.indexOf(base64[i++]);
	// 		const char2 = chars.indexOf(base64[i++]);
	// 		const char3 = chars.indexOf(base64[i++]);
	// 		const char4 = chars.indexOf(base64[i++]);

	// 		const bits = (char1 << 18) | (char2 << 12) | (char3 << 6) | char4;

	// 		result += String.fromCharCode((bits >> 16) & 255);
	// 		if (char3 !== 64) result += String.fromCharCode((bits >> 8) & 255);
	// 		if (char4 !== 64) result += String.fromCharCode(bits & 255);
	// 	}

	// 	return result;
	// }

	abortRecording(): void {
		this.cleanup();
	}

	async stopRecording(): Promise<Blob | null> {
		let blob = null;
		// Check if recording is already unloaded or not recording
		if (!this.recording || !this.isRecording) return null;

		try {
			await this.recording.stopAndUnloadAsync();
			const uri = this.recording.getURI();

			if (uri) {
				const response = await fetch(uri);
				blob = await response.blob();
				const title = `audio_${Date.now()}.m4a`;

				this._recorded.next({ blob, title });
			}
			return blob;
		} catch (error) {
			this.handleError(error);

			return blob;
		} finally {
			this.cleanup();
		}
	}

	private cleanup(): void {
		if (this.interval) clearInterval(this.interval);
		if (this.chunkInterval) clearInterval(this.chunkInterval);

		this.recording = null; // Đã unload ở nơi khác
		this.isRecording = false;
		this.startTime = null;
		this.audioFileUri = '';
		this.lastPosition = 0;
	}

	private handleError(error: unknown): void {
		const message =
			error instanceof Error ? error.message : 'Unknown error';
		this._recordingFailed.next(message);
		this.cleanup();
	}

	async playAudio(base64: string | null | undefined): Promise<void> {
		try {
			// Dừng nếu đang phát cái khác
			if (this.currentSound) {
				await this.currentSound.stopAsync();
				await this.currentSound.unloadAsync();
				this.currentSound = null;
			}

			// ⚠️ Check base64 hợp lệ
			if (!base64 || base64.trim() === '') {
				MyToastUtils.show({
					type: 'error',
					text2: 'File không hợp lệ',
				});
				this.cleanupCurrentAudio(); // đảm bảo dọn
				if (this.onAudioFinishedCallback) {
					this.onAudioFinishedCallback();
				}
				return;
			}

			const fileUri = FileSystem.cacheDirectory + `audio_playback.wav`;

			// Ghi file
			await FileSystem.writeAsStringAsync(fileUri, base64, {
				encoding: FileSystem.EncodingType.Base64,
			});

			const { sound } = await Audio.Sound.createAsync(
				{ uri: fileUri },
				{ shouldPlay: true }
			);

			this.currentSound = sound;

			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.isLoaded && status.didJustFinish) {
					this.cleanupCurrentAudio();
					if (this.onAudioFinishedCallback) {
						this.onAudioFinishedCallback();
					}
				} else if (!status.isLoaded && status.error) {
					console.warn('Audio load error:', status.error);
					this.cleanupCurrentAudio();
					if (this.onAudioFinishedCallback) {
						this.onAudioFinishedCallback();
					}
				}
			});
		} catch (error) {
			console.error('playAudio error:', error);
			this.cleanupCurrentAudio();
			if (this.onAudioFinishedCallback) {
				this.onAudioFinishedCallback();
			}
		}
	}

	private async cleanupCurrentAudio(): Promise<void> {
		if (this.currentSound) {
			try {
				await this.currentSound.stopAsync();
				await this.currentSound.unloadAsync();
			} catch (err) {
				console.warn('Cleanup audio failed:', err);
			} finally {
				this.currentSound = null;
			}
		}
	}

	async stopCurrentAudio(): Promise<void> {
		await this.cleanupCurrentAudio();
	}

	public setOnAudioFinished(callback: () => void) {
		this.onAudioFinishedCallback = callback;
	}
}

// Export the singleton instance
export const audioRecordingStreamService =
	AudioRecordingStreamService.getInstance();
