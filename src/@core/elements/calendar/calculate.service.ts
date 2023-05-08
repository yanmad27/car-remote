import moment from 'moment';

export const getStartTime = (data: { startAt: string }[]) => {
	let startTime = moment(data[0].startAt).endOf('date');
	data.forEach((item: any) => {
		const itemStartTime = moment(item.startAt);
		if (itemStartTime.isBefore(startTime)) {
			startTime = itemStartTime;
		}
	});
	return startTime.toISOString();
};

export const getEndTime = (data: { endAt: string }[]) => {
	let endTime = moment(data[0].endAt).startOf('day');
	data.forEach((item: any) => {
		const itemEndTime = moment(item.endAt);
		if (itemEndTime.isAfter(endTime)) {
			endTime = itemEndTime;
		}
	});
	return endTime.toISOString();
};
