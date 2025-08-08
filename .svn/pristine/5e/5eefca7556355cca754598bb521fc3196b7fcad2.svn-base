import { AxiosError } from 'axios';
import instance from '../../axios';
import { BaseService } from '../baseService';
import { RoleDetail, RoleRequest, SearchRoleRequest } from '.';

export class RoleService extends BaseService {
	private static instance: RoleService;

	private constructor() {
		super();
	}

	public static getInstance(): RoleService {
		if (!RoleService.instance) {
			RoleService.instance = new RoleService();
		}
		return RoleService.instance;
	}

	getListRole() {
		return this.postData('/role/data', null);
	}
	searchRoles(data: SearchRoleRequest) {
		return this.postData('/role/search', data);
	}

	createRole(role: RoleDetail, isAdminDonvi?: boolean) {
		return this.postData('/role/insert', {
			...role,
			isAdminDonvi: isAdminDonvi,
		});
	}
	deleteRole(code: string, isAdminDonvi?: boolean) {
		return this.postData('/role/delete', {
			code: code,
			isAdminDonvi: isAdminDonvi,
		});
	}
	updateRole(role: RoleRequest) {
		return this.postData('/role/update', role);
	}
	//get role key
	getRoleKey() {
		return this.postData('/role/getRoleKey', null);
	}

	getFeatures(listRole: string[]) {
		const body = {
			roles: listRole,
		};
		return this.postData('/role/features', body);
	}

	saveRoleFeature(roleId: string, features: number[], home_page_id?: number) {
		const body = {
			role: roleId,
			featuresIds: features,
			home_page_id: home_page_id,
		};
		return this.postData('/role/save-role-feature', body);
	}

	saveUserRole(username: string, roles: string[], isAdminDonvi?: boolean) {
		const body = {
			username: username,
			roleKeys: roles,
			isAdminDonvi: isAdminDonvi,
		};
		return this.postData('/role/save-user-role', body);
	}
	getFeatureByName(user: string) {
		return this.postData('/role/getFeatureByName', { username: user });
	}
	getByUser(user: string) {
		return this.postData('/role/get-by-username', { username: user });
	}

	importExcel(data: any) {
		return this.postData('/role/importExcel', data);
	}

	exportAllExcel(data: SearchRoleRequest) {
		return this.postData('/role/exportAllExcel', data);
	}

	getFeaturesDept(listRole: string[]) {
		const body = {
			roles: listRole,
		};
		return this.postData('/role/featuresDept', body);
	}
	searchRoles2(data: SearchRoleRequest) {
		return this.postData('/role/search2', data);
	}

	updateRoleFeatureHomePage(roleKey: string, featureId: number) {
		const body = {
			roleKey: roleKey,
			featureId: featureId,
			is_home_page: 1,
		};
		return this.postData('/role/updateRoleFeatureHomePage', body);
	}

	getHomePageByRole(listRoleKey?: string[]) {
		const body = {
			listRoleKey: listRoleKey,
		};
		return this.postData('/role/getHomePageByRole', body);
	}
	getFeatureByNameWithoutLv0(user: string) {
		return this.postData('/role/getFeatureByNameWithoutLv0', {
			username: user,
		});
	}

	getFeatureByNameToTree(user: string) {
		return this.postData('/role/getFeatureByNameToTree', {
			username: user,
		});
	}

	getListDept() {
		return this.postData('/role/getListDept', null);
	}

	getAllRole() {
		return this.postData('/role/getAllRole', null);
	}

	getMyRole() {
		return this.postData('/role/getMyRole', null);
	}
}
