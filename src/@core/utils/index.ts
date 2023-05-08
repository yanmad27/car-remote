import moment from 'moment';

export const isEmpty = (value: any) => [null, undefined, ''].includes(value);

export const isNaNOr = (value: any, fallbackValue = 0) => (isNaN(value) ? fallbackValue : value);
export const deleteNullInObject = (obj: any) => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => {
		if (isEmpty(newObj[key])) {
			delete newObj[key];
		}
	});
	return newObj;
};

export const getEndpoint = (endpoint: string, queries?: any) => {
	queries = deleteNullInObject(queries);
	const queriesStr = new URLSearchParams(queries).toString();
	return endpoint + '?' + queriesStr;
};

export const mergeClassName = (...classNames: (string | any)[]) => classNames.filter(notNull).join(' ');

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const displayDate = (date?: any) => {
	if (!date) return null;
	return moment(date).format('HH:mm:ss DD/MM/YYYY');
};

export const unique = (value: any, index: number, self: any[]) => {
	return self.indexOf(value) === index;
};

export const notNull = (value: any, index: number, self: any[]) => {
	return !isEmpty(value);
};

/**
 *
 * @param time in seconds
 * @returns xxh yym zzs
 */
export const displayTime = (time: number) => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor(time % 60);
	//check isNan
	if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return '';
	if (hours === 0 && minutes === 0 && seconds === 0) return '0s';
	if (hours === 0 && minutes === 0) return `${seconds}s`;
	if (hours === 0) return `${minutes}m ${seconds}s`;
	return `${hours}h ${minutes}m ${seconds}s`;
};
