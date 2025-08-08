export * from './role.service';
export class SearchRoleRequest {
	roleValue?: string;
	roleLevel?: string;
	description?: string;
	is_authenrized?: number;
	vungdulieu_id?: string;
	pageIndex: number;
	pageSize: number;
	capdonvi?: number;
	listDonvi?: string;
	the_order?: number;
	constructor(page: number, pageSize: number) {
		this.pageIndex = page;
		this.pageSize = pageSize;
	}
}
export class RoleDetail {
	roleKey?: string;
	roleValue?: string;
	roleLevel?: string;
	description?: string;
	isSelected?: boolean;
	is_authenrized?: number;
	vungdulieu_id?: string;
	capdonvi?: number;
	listDonvi?: string;
	the_order?: number;
}
export class RoleRequest {
	keyCode?: string;
	value?: string;
	level?: string;
	description?: string;
	is_authenrized?: number;
	vungdulieu_id?: string;
	capdonvi?: number;
	listDonvi?: string;
	the_order?: number;
	isAdminDonvi?: boolean;
}
