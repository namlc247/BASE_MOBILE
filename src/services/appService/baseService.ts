import { AxiosError } from 'axios';
import instance from '../axios';

export abstract class BaseService {
	protected postData = async (url: string, request?: any): Promise<any> => {
		const requestUrl = `/gateway${url}`;
		try {
			const response = await instance.post<any>(
				requestUrl,
				request || {},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;

			console.error('Error during request:', axiosError.message);
			throw error;
		}
	};
}
