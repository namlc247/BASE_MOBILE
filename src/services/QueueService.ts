import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDataStore } from '../stores/dataStore';

interface QueueItem {
	id: string;
	action: string;
	data: any;
	timestamp: number;
}

export class QueueService {
	private static QUEUE_KEY = '@queue';

	static async addToQueue(action: string, data: any): Promise<void> {
		const queue = await this.getQueue();
		const queueItem: QueueItem = {
			id: Math.random().toString(36).substr(2, 9),
			action,
			data,
			timestamp: Date.now(),
		};
		queue.push(queueItem);
		await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
	}

	static async processQueue(): Promise<void> {
		const queue = await this.getQueue();
		if (queue.length === 0) return;

		for (const item of queue) {
			try {
				// Process based on action type
				switch (item.action) {
					case 'UPDATE_DATA':
						await useDataStore
							.getState()
							.updateData(item.data.id, item.data.updates);
						break;
					// Add other action types as needed
				}
			} catch (error) {
				// console.error('Error processing queue item:', error);
				// Keep failed items in queue
				continue;
			}
		}

		// Clear processed items
		await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify([]));
	}

	private static async getQueue(): Promise<QueueItem[]> {
		const queue = await AsyncStorage.getItem(this.QUEUE_KEY);
		return queue ? JSON.parse(queue) : [];
	}
}
