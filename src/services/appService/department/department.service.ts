import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { DepartmentRequest, SearchDepartmentRequest } from '.';
import { BaseService } from '../baseService';

export class DepartmentService extends BaseService {
	private static instance: DepartmentService;

	private constructor() {
		super();
	}

	public static getInstance(): DepartmentService {
		if (!DepartmentService.instance) {
			DepartmentService.instance = new DepartmentService();
		}
		return DepartmentService.instance;
	}

	getDataToTree(type: number) {
		return this.postData('/department/getDataToTree', { type: type });
	}

	getDataToTreeForMobile = async (
		request?: DepartmentRequest
	): Promise<any> => {
		return this.postData('/department/getDataToTreeForMobile', request);
	};

	getDataToTreeBCGB = async (request: DepartmentRequest): Promise<any> => {
		return this.postData('/department/getDataToTreeBCGB', request);
	};
}
