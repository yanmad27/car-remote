import Config from '@core/configs';
import axios from 'axios';
import Cookies from 'js-cookie';

const headers: any = {
	'Content-Type': 'application/json',
	'Access-Control-Request-Origin': '*',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization',
};

export interface ITimeInfo {
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

axios.interceptors.request.use(
	function (config) {
		const authHeader = Config.Env.NEXT_PUBLIC_X_ACCESS_TOKEN;
		const accessToken: any = Cookies.get(authHeader);
		config.headers = {
			...headers,
			...config.headers,
			[authHeader]: accessToken,
		};
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const status = error?.response?.status;
		const returnUrl = encodeURI(window.location.pathname + window.location.search);
		const returnUrlStr = returnUrl?.includes('/login') ? '' : `?returnUrl=${returnUrl}`;
		switch (status) {
			case 401:
				Cookies.remove(Config.Env.NEXT_PUBLIC_X_ACCESS_TOKEN);
				window.location.href = '/login' + returnUrlStr;
				break;
			default:
				return Promise.reject(error);
		}
	},
);

const callApi = (
	endpoint: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	body?: any,
	headers?: any,
	isBlob = false,
) => {
	const baseUrl = Config.Env.NEXT_PUBLIC_BE_URL;
	const url = baseUrl + endpoint;
	const responseType = isBlob ? 'blob' : 'json';
	return axios({
		url: url,
		method: method,
		data: body || {},
		headers,
		responseType,
	})
		.then((res) => {
			if (res?.status !== 200 && res?.status !== 201) throw res;
			return res?.data;
		})
		.catch((err) => {
			console.error('ERR ~ ', err);
			throw err;
		});
};

export default callApi;
