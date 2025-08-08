export class SearchQuanLyFileRequest {
	id?: number;
	name?: string;
	description?: string;
	file?: string;

	pageIndex: number;
	pageSize: number;
	constructor(page?: number, pageSize?: number) {
		this.pageIndex = page ?? 0;
		this.pageSize = pageSize ?? 10;
	}
}

export class QuanLyFileDetail {
	id?: number;
	name?: string;
	description?: string;
	file?: string;
}

export class QuanLyFileRequest {
	id?: number;
	name?: string;
	file_code?: string;
	description?: string;
	file?: string;
	filename?: string;
	formData?: FormData;
}
export class FileImport {
	file?: string;
	filename?: string;
}
