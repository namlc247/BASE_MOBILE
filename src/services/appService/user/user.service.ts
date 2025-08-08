import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { BaseService } from '../baseService';
import { SearchUserRequest } from '.';

export class PmbcUserService extends BaseService {
	private static instance: PmbcUserService;

	private constructor() {
		super();
	}

	public static getInstance(): PmbcUserService {
		if (!PmbcUserService.instance) {
			PmbcUserService.instance = new PmbcUserService();
		}
		return PmbcUserService.instance;
	}

	getUserDetail = async (): Promise<any> => {
		return this.postData('/user/detail');
	};

	searchEmployee = async (request: SearchUserRequest): Promise<any> => {
		return this.postData('/user/searchEmployee', request);
	};

	getAllUserCanChat(deptCode: string) {
		return this.postData('/user/getAllUserCanChat', { deptCode: deptCode });
	}
}

// Định nghĩa hàm gọi API
