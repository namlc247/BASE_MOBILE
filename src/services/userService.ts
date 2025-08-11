// userService.ts
import axios, { AxiosError } from 'axios';

const instance = axios.create({
	baseURL: 'http://103.124.94.201:8090', // Base URL
	timeout: 10000,
});

// Định nghĩa kiểu dữ liệu cho response (nếu bạn biết cấu trúc dữ liệu trả về)
interface UserDetailResponse {
	// Thêm các trường dữ liệu mà bạn mong đợi từ API
	id: number;
	userName: string;
	// Các trường khác nếu có
}

// Định nghĩa hàm gọi API
export const fetchUserDetail = async (
	id: number,
	userName: string
): Promise<UserDetailResponse> => {
	try {
		const response = await instance.post<UserDetailResponse>(
			'/gateway/user/detail',
			{
				id,
				userName,
			}
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		// console.error('Error fetching user detail:', axiosError.message);
		throw error; // Hoặc xử lý lỗi theo cách bạn muốn
	}
};
