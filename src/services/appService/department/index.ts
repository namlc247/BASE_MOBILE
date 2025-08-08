export class SearchDepartmentRequest {
	departmentCode?: string;
	departmentName?: string;
	countEmployee?: number;
	description?: string;
	rank?: string;
	level?: number;
	parentId?: string;
	parentIdST?: string;
	lstDeptAuthorized?: string;
	phoneNumber: string;
	parentName: string;
	address?: string;
	fax?: string;
	email?: string;
	theOrder?: number;
	adminStaff?: string;
	fullNameDepart?: string;
	codeBuildTree?: string;
	codeParrent?: string;
	satNhapStatus?: number;
	pageIndex: number;
	pageSize: number;
	type: number;
	isGetUser?: number;
	constructor(page: number, pageSize: number) {
		this.departmentCode = '';
		this.departmentName = '';
		this.countEmployee = 0;
		this.description = '';
		this.rank = '';
		this.lstDeptAuthorized = '';
		this.phoneNumber = '';
		this.parentName = '';
		this.address = '';
		this.fax = '';
		this.email = '';
		this.theOrder = 0;
		this.adminStaff = '';
		this.fullNameDepart = '';
		this.codeBuildTree = '';
		this.codeParrent = '';
		this.satNhapStatus = 0;
		this.type = 0;
		this.pageIndex = page;
		this.pageSize = pageSize;
	}
}

export class DepartmentDetail {
	departmentCode?: string;
	departmentName?: string;
	countEmployee?: number;
	description?: string;
	rank?: string;
	level?: number;
	parentId?: string;
	parentIdST?: string;
	lstDeptAuthorized?: string;
	satNhapStatus?: number;
}
export class DepartmentRequest {
	code?: string;
	name?: string;
	amount?: number;
	description?: string;
	rank?: string;
	level?: number;
	parentId?: string;
	parentIdST?: string;
	lstDeptAuthorized?: string;
	satNhapStatus?: number;
	adminStaff?: string;
	isGetUser?: number;
	weekGiaoBan?: number;
	startDateInWeek?: string;
	type?: number;
}
