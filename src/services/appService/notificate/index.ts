export class SearchPmbcNotificateRequest {
	gid: number;
	tieu_de?: string;
	noi_dung?: string;
	file_name?: string;
	sms_status?: number;
	user_created?: number;
	time_created?: string;
	sms_statusST?: string;
	user_createdST?: string;
	view_status?: number;
	lstDepartment?: string[];
	lstPerson?: number[];
	pageIndex?: number;
	pageSize?: number;
	date_begin: string;
	date_to: string;
	typeSearch?: number;
	type?: number;
	typeExport?: number;
	userId?: number;
	timeLoadMobile?: number; // giây

	constructor(page?: number, pageSize?: number) {
		this.gid = 0;

		this.tieu_de = '';
		this.noi_dung = '';
		this.file_name = '';
		this.sms_status = 0;
		this.user_created = 0;
		this.time_created = '';
		this.sms_statusST = '';
		this.user_createdST = '';
		this.view_status = 0;
		this.lstDepartment = [];
		this.lstPerson = [];
		this.pageIndex = page;
		this.pageSize = pageSize;
		this.date_begin = '';
		this.date_to = '';
		this.typeSearch = 0;
		this.type = 0;
	}
}

export class PmbcNotificateDetail {
	gid?: number;
	tieu_de?: string;
	noi_dung?: string;
	file_name?: string;
	sms_status?: number;
	user_created?: number;
	time_created?: string;
	sms_statusST?: string;
	user_createdST?: string;
	main_id?: number;
	lstDepartment?: string[];
	lstPerson?: number[];
	ghim?: number;
	userId?: number;
}

export class PmbcNotificateRequest {
	gid?: number;
	tieu_de?: string;
	noi_dung?: string;
	file_name?: string;
	sms_status?: number;
	user_created?: number;
	time_created?: string;
	sms_statusST?: string;
	user_createdST?: string;
	main_id?: number;
	lstDepartment?: string[];
	lstPerson?: number[];
	ghim?: number;
	userId?: number;
	list_file_name?: string[];
}

export class FileImport {
	file?: string;
	filename?: string;
}
