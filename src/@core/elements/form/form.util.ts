import { isEmpty } from '@core/utils';

export const resolve = (path: string, obj: any) => {
	return path.split('.').reduce(function (prev, curr) {
		return prev ? prev[curr] : null;
	}, obj || self);
};

export const isEmail = (email: string) => {
	return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(email) || 'Không đúng định dạng email';
};

export const isPhone = (phone: string) => {
	if (isEmpty(phone)) return true;
	return /^[0-9]{10}$/.test(phone) || 'Số điện thoại gồm 10 số';
};

export const isNumber = (number: string) => {
	return /^[0-9]+$/.test(number) || 'Không đúng định dạng số';
};
