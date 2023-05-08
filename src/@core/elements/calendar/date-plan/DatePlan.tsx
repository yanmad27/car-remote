import { getEndTime, getStartTime } from '@core/elements/calendar/calculate.service';
import { isNaNOr } from '@core/utils';
import ScheduleItem from 'components/timetable/schedule-item/ScheduleItem';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './DatePlan.module.scss';

interface Props {
	data?: { startAt: string; endAt: string }[];
}

const height = 75;
const oneHourHeight = height + 2;
const oneHourEventHeight = oneHourHeight + 16;
const DatePlan = ({ data }: Props) => {
	const [availableHours, setAvailableHours] = useState<any>([]);
	useEffect(() => {
		if (!data) return;
		const startTime = getStartTime(data);
		const endTime = getEndTime(data);

		const minHour = moment(startTime).hour();
		const maxMinute = moment(endTime).minute();
		const maxHour = moment(endTime).hour() + (maxMinute > 0 ? 1 : 0);

		const availableHours = Array.from({ length: maxHour - minHour + 1 }, (_, index) => index + minHour);
		setAvailableHours(availableHours);
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.timeList} style={{ gap: oneHourHeight }}>
				{availableHours.map((item: any, index: any) => {
					return (
						<div className={styles.timeItem} key={index}>
							<span className={styles.hour}>{moment().hour(item).minute(0).format('HH:mm')}</span>
							<div className={styles.timeSeparator} />
						</div>
					);
				})}
				<div className={styles.timeItem} />
			</div>
			<div className={styles.eventList}>
				{data?.map((item, index) => {
					const startAt = moment(item.startAt);
					const endAt = moment(item.endAt);
					const startOfDate = moment(startAt).startOf('date');
					const startHour = availableHours[0] * oneHourEventHeight;
					const top = Math.abs((startAt.diff(startOfDate, 'minute') * oneHourEventHeight) / 60) - startHour;
					const bottom = Math.abs((endAt.diff(startOfDate, 'minute') * oneHourEventHeight) / 60) - startHour;
					const height = Math.abs(bottom - top - 3);
					return (
						<div
							key={index}
							className={styles.eventItem}
							style={{ top: isNaNOr(top), height: isNaNOr(height) }}
						>
							<ScheduleItem title={'GS 6 Living Onlive'} startAt={item.startAt} endAt={item.endAt} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default DatePlan;
