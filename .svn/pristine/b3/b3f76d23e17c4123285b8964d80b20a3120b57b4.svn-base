import { AxiosError } from 'axios';
import instance from '../../axios';
import { QuanLyFileRequest } from '.';
import { BaseService } from '../baseService';

export class FileCommonService extends BaseService {
	private static instance: FileCommonService;

	private constructor() {
		super();
	}

	public static getInstance(): FileCommonService {
		if (!FileCommonService.instance) {
			FileCommonService.instance = new FileCommonService();
		}
		return FileCommonService.instance;
	}

	downloadFileCommon = async (fileName: string): Promise<any> => {
		return this.postData('/common/downloadFileCommon', {
			filename: fileName,
		});
	};

	insertFileCommon = async (request: QuanLyFileRequest): Promise<any> => {
		return this.postData('/common/insertFileCommon', request);
	};

	convertM4AToWAV = async (request: QuanLyFileRequest): Promise<any> => {
		return this.postData('/common/convertM4AToWAV', request);
	};
}
