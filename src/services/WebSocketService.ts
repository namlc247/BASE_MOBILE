import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';
import MyToastUtils from '../utils/toastConfig';

class WebSocketService {
	private static instance: WebSocketService;
	private pingInterval: any;
	private socket: WebSocket | null = null;
	private retryTimeout: any;
	private readonly retryDelay = 3000; // Delay before retrying connection
	private isLoggingOut = false;

	private onSocketChangeCallback:
		| ((socket: WebSocket | null) => void)
		| null = null;

	private constructor() {}

	public static getInstance(): WebSocketService {
		if (!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService();
		}
		return WebSocketService.instance;
	}

	setOnSocketChange(callback: (socket: WebSocket | null) => void) {
		this.onSocketChangeCallback = callback;
	}

	connect(isShowToast?: boolean): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			// wss://0116-113-190-254-85.ngrok-free.app/gateway/websocket
			// const url = 'ws://10.86.1.107:4001/gateway/websocket';
			const ipServer = await SecureStore.getItemAsync('ipServer');

			const ipSocket = ipServer?.includes('https')
				? ipServer?.replace('https://', 'wss://')
				: ipServer?.replace('http://', 'ws://');

			const url = `${ipSocket}/gateway/websocket`;
			console.log(`Connecting to WebSocket with URL:`, url);
			this.socket = new WebSocket(url);

			this.socket.onopen = async () => {
				console.log('WebSocket connected');
				// Alert.alert('Thành công', 'Web socket: ' + url);
				const token = await SecureStore.getItemAsync('token');
				if (token) {
					const encodedToken = Buffer.from(token, 'utf-8').toString(
						'base64'
					);
					if (this.socket) {
						this.socket.send(
							JSON.stringify({
								type: 'connectReq',
								content: encodedToken,
							})
						);

						this.pingInterval = setInterval(() => {
							if (
								this.socket &&
								this.socket.readyState === WebSocket.OPEN
							) {
								this.socket.send(
									JSON.stringify({ type: 'ping' })
								);
								// console.log(
								// 	'Ping sent to keep connection alive'
								// );
							}
						}, 10000);

						if (this.onSocketChangeCallback) {
							this.onSocketChangeCallback(this.socket);
						}

						if (isShowToast) {
							MyToastUtils.show({
								type: 'success',
								text2: `Kết nối socket thành công`,
							});
						}
					}
					resolve();
				} else {
					// console.error(
					// 	'Token does not exist, closing WebSocket connection'
					// );
					if (this.socket) {
						this.socket.close();
					}
					reject(new Error('Token does not exist'));
				}
			};

			this.socket.onclose = (event) => {
				console.log('WebSocket connection closed', event);

				if (this.pingInterval) {
					clearInterval(this.pingInterval);
					this.pingInterval = null;
				}

				if (this.onSocketChangeCallback) {
					this.onSocketChangeCallback(this.socket);
				}

				// Alert.alert(
				// 	'Socket onclose' + url,
				// 	JSON.stringify(event, null, 2) +
				// 		'\n' +
				// 		'onclose: ' +
				// 		event.reason
				// );

				// if (!this.isLoggingOut) {
				// 	console.log('Retrying connection in 3 seconds...');
				// 	this.retryConnection();
				// }
			};

			this.socket.onerror = (error: any) => {
				console.error('WebSocket error', error.message);

				if (this.pingInterval) {
					clearInterval(this.pingInterval);
					this.pingInterval = null;
				}

				if (this.onSocketChangeCallback) {
					this.onSocketChangeCallback(this.socket);
				}

				// Alert.alert(
				// 	'Socket onerror' + url,
				// 	JSON.stringify(error, null, 2) +
				// 		'\n' +
				// 		'onerror: ' +
				// 		error.message
				// );

				// if (!this.isLoggingOut) {
				// 	console.log('Retrying connection in 3 seconds...');
				// 	this.retryConnection();
				// }
				// reject(error);
			};
		});
	}

	getSocket(): WebSocket | null {
		return this.socket;
	}

	retryConnection() {
		this.retryTimeout = setTimeout(() => {
			this.connect().catch((error) => {
				console.error('Retry connection failed: ', error);
			});
		}, this.retryDelay);
	}

	isConnected(): boolean {
		return this.socket ? this.socket.readyState === WebSocket.OPEN : false;
	}

	sendMessage(message: any) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(message));
		} else {
			console.error(
				'WebSocket is not open. Ready state: ',
				this.socket?.readyState
			);
		}
	}

	close() {
		this.isLoggingOut = true;

		if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}
		if (this.socket) {
			this.socket.close();
		}
		if (this.retryTimeout) {
			clearTimeout(this.retryTimeout);
		}
	}

	ngOnDestroy() {
		if (this.retryTimeout) {
			clearTimeout(this.retryTimeout);
		}
		if (this.socket) {
			this.socket.close();
		}
	}
}

export default WebSocketService.getInstance();
