import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { BaseService } from '../baseService';
import {
	SearchSystemSettingsRequest,
	SystemSettingsDetail,
	SystemSettingsRequest,
} from '.';

export class SystemSettingsService extends BaseService {
	private static instance: SystemSettingsService;

	private constructor() {
		super();
	}

	public static getInstance(): SystemSettingsService {
		if (!SystemSettingsService.instance) {
			SystemSettingsService.instance = new SystemSettingsService();
		}
		return SystemSettingsService.instance;
	}

	getListObjs() {
		return this.postData('/systemsettings/data', null);
	}
	searchLists(data: SearchSystemSettingsRequest) {
		return this.postData('/systemsettings/search', data);
	}

	createObj(item: SystemSettingsDetail) {
		return this.postData('/systemsettings/insert', item);
	}

	deleteObj(itemId: number) {
		return this.postData('/systemsettings/delete', { ss_gid: itemId });
	}

	updateObj(item: SystemSettingsRequest) {
		return this.postData('/systemsettings/update', item);
	}

	updateUserSetting(item: SystemSettingsRequest) {
		return this.postData('/systemsettings/updateUserSetting', item);
	}
}
