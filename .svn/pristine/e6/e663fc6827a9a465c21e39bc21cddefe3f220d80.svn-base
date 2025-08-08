export class SearchUserRequest {
	username?: string;
	fullname?: string;
	phone?: string;
	email?: string;
	status?: string;
	department?: string;
	pageIndex: number;
	pageSize: number;
	vaitro?: number;
	userId?: number;
	thuTruong?: number;
	roleKey?: string;
	listRoleKey?: any[];
	listChucVu?: any[];
	departmentCode?: string;
	key?: string;
	list_dp_code?: string[];
	listDepartmentCode?: string[];
	listCanBoId?: number[];
	typeExport?: number;

	isGetListUserWithDep?: boolean;
	isGetChiHuy?: boolean;

	constructor(page?: number, pageSize?: number) {
		this.username = '';
		this.fullname = '';
		this.phone = '';
		this.email = '';
		this.status = '';
		this.department = '';
		this.key = '';
		this.pageIndex = page || 0;
		this.pageSize = pageSize || 10;
		// this.vaitro = 0;
		this.listDepartmentCode = [];
		this.listCanBoId = [];
	}
}

export class UserDetail {
	birthDay?: Date;
	salary?: number;
	dayOff?: number;
	restDayOff?: number;
	userId?: number;
	fullname?: string;
	address?: string;
	sex?: string;
	phone?: string;
	username?: string;
	departmentCode?: string;
	specializeLevel?: string;
	rank?: string;
	academicLevel?: string;
	certificate?: string;
	workingPhone?: string;
	workingMail?: string;
	description?: string;
	status?: string;
	password?: string;
	certStaffId?: number;
	statusUser?: number;
	fax?: string;
	dateEffectStart?: Date;
	dateEffectEnd?: Date;
	quanHam?: number;
	chucVu?: number;
	vaiTro?: number;
	thuTruong?: number;
	canBo?: number;
	thuTu?: number;
	shqn?: string;
	image?: string;
	fileDinhKem?: string;
	thuDt_account?: string;
	thuDt_password?: string;
	qlvb_account?: string;
	qlvb_password?: string;
	firstLog?: number;
	typeUpdate?: number;

	typeData?: number; //cái dòng này để phân biệt thông tin user hay là hiển thị Đơn vị
}

export class ExpWorkUser {
	username?: string;
	timeStart?: Date;
	timeEnd?: Date;
	description?: string;
}

export class ForgotPassword {
	last_name?: string;
	user_name?: string;
	birthday?: Date;
}
