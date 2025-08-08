import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { PmbcNotificateRequest, SearchPmbcNotificateRequest } from '.';
import { BaseService } from '../baseService';

export class PmbcNotificateService extends BaseService {
	private static instance: PmbcNotificateService;

	private constructor() {
		super();
	}

	public static getInstance(): PmbcNotificateService {
		if (!PmbcNotificateService.instance) {
			PmbcNotificateService.instance = new PmbcNotificateService();
		}
		return PmbcNotificateService.instance;
	}

	getNotificateForMobile = async (
		request: SearchPmbcNotificateRequest
	): Promise<any> => {
		return this.postData('/pmbcNotificate/search', request);
	};

	getOneById(gid: number) {
		return this.postData('/pmbcNotificate/getOneById', { gid: gid });
	}

	insertNotificate = async (request: PmbcNotificateRequest): Promise<any> => {
		return this.postData('/pmbcNotificate/insert', request);
	};

	getDraftNotificateByUser = async (
		request: SearchPmbcNotificateRequest
	): Promise<any> => {
		return this.postData(
			'/pmbcNotificate/getDraftNotificateByUser',
			request
		);
	};

	getNewsfeed = async (
		request: SearchPmbcNotificateRequest
	): Promise<any> => {
		return this.postData('/pmbcNotificate/getListThongBaoByUser', request);
	};

	getNewsfeedByTime = async (
		request: SearchPmbcNotificateRequest
	): Promise<any> => {
		return this.postData(
			'/pmbcNotificate/getListThongBaoOfUserAndTime',
			request
		);
	};

	checkAllReaded = async () => {
		return this.postData('/pmbcNotificate/checkAllReaded', null);
	};

	deleteObj = async (gid: number) => {
		return this.postData('/pmbcNotificate/delete', { gid: gid });
	};

	changeViewStatus(gid: number) {
		return this.postData('/pmbcNotificate/changeViewStatus', { gid: gid });
	}
}
