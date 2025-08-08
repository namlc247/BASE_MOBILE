import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { BaseService } from '../baseService';
import {
	GuidePropertyDetail,
	GuidePropertyRequest,
	SearchGuidePropertyRequest,
} from '.';

export class GuidePropertyService extends BaseService {
	private static instance: GuidePropertyService;

	private constructor() {
		super();
	}

	public static getInstance(): GuidePropertyService {
		if (!GuidePropertyService.instance) {
			GuidePropertyService.instance = new GuidePropertyService();
		}
		return GuidePropertyService.instance;
	}

	getListObjs() {
		return this.postData('/guideproperty/data', null);
	}
	searchLists(data: SearchGuidePropertyRequest) {
		return this.postData('/guideproperty/search', data);
	}

	createObj(item: GuidePropertyDetail) {
		return this.postData('/guideproperty/insert', item);
	}
	deleteObj(itemId: number) {
		return this.postData('/guideproperty/delete', { id: itemId });
	}
	updateObj(item: GuidePropertyRequest) {
		return this.postData('/guideproperty/update', item);
	}

	exportAllExcel(data: SearchGuidePropertyRequest) {
		return this.postData('/guideproperty/exportAllExcel', data);
	}

	getOneByCode(data: SearchGuidePropertyRequest) {
		return this.postData('/guideproperty/getOneByCode', data);
	}
}
