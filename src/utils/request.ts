import axios, { InternalAxiosRequestConfig, AxiosReponse } from 'axios';
import { useUserStoreHook } from '@/store/modules/user';

// 创建 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 50000,
	headers: {'Content-Type': 'application/json;charset=utf-8'}
});
// 请求拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const userStore = useUserStoreHook();
		if (userStore.token) {
			config.headers.Authorization = userStore.token;
		}
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
)
// 响应拦截器
service.interceptors.reponse.use(
	(response: AxiosReponse) => {
		const { code, msg } = response.data;
		if (code === '0000') {
			return response.data;
		}
		ElMessage.error(msg || '系统出错');
		return Promise.reject(new Error(msg || 'error'));
	},
	(error: any) => {
		if (error.response.data) {
			const {code, msg} = error.response.data;
			// token 过期，跳转登录页
			if (code === 'A0230') {
				ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					localStorage.clear(); // @vueuse/core 自动导入
					window.location.href = '/';
				})
			}
		}
		return Promise.reject(error.message);
	}
)

export default service;
