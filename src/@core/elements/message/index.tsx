import Config from '@core/configs';
import { notification } from 'antd';
// import type { NotificationPlacement } from 'antd/es/notification';
import toast from 'react-hot-toast';
const successMessage: any = {
	200: 'Success',
	201: 'Success',
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

enum NotifyLib {
	TOAST = 'toast',
	ANTD = 'antd',
}
const makeCapitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const openNotification = (type: NotificationType, placement: any, message: string) => {
	notification[type]({
		message: makeCapitalized(type),
		description: message,
		placement,
	});
};

const placement = 'bottomRight';
const lib = Config.Env.NOTIFY_LIBRARY ?? NotifyLib.TOAST;

function success(code: number): void;
function success(content: string): void;
function success(arg: any): void {
	if (typeof arg === 'string') {
		if (lib === NotifyLib.TOAST) toast.success(arg);
		if (lib === NotifyLib.ANTD) openNotification('success', placement, arg);
	} else {
		if (lib === NotifyLib.TOAST) toast.success(successMessage[arg]);
		if (lib === NotifyLib.ANTD) openNotification('success', placement, '');
	}
}

// const errorMessage = {
//   409: 'Duplicate key',
//   417: 'You can not delete this department because it contains channels',
//   500: 'Internal server error',
// };

function error(code: number): void;
function error(content: string): void;
function error(arg: any): void {
	if (typeof arg === 'string') {
		if (lib === NotifyLib.TOAST) toast.error(arg);
		if (lib === NotifyLib.ANTD) openNotification('error', placement, arg);
	} else {
		if (lib === NotifyLib.TOAST) toast.error('Error');
		if (lib === NotifyLib.ANTD) openNotification('error', placement, arg);
	}
}

const warningMessage = {};

function warning(code: number): void;
function warning(content: string): void;
function warning(arg: any): void {
	if (typeof arg === 'string') {
		if (lib === NotifyLib.TOAST) toast.error(arg);
		if (lib === NotifyLib.ANTD) openNotification('warning', placement, arg);
	} else {
		if (lib === NotifyLib.TOAST) toast.error('Error');
		if (lib === NotifyLib.ANTD) openNotification('warning', placement, arg);
	}
}

function info(code: number): void;
function info(content: string): void;
function info(arg: any): void {
	if (typeof arg === 'string') {
		if (lib === NotifyLib.TOAST) toast.error(arg);
		if (lib === NotifyLib.ANTD) openNotification('info', placement, arg);
	} else {
		if (lib === NotifyLib.TOAST) toast.error('Error');
		if (lib === NotifyLib.ANTD) openNotification('info', placement, arg);
	}
}
export const notify = { success, error, warning, info };
