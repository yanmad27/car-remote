import ScheduleItem from 'components/timetable/schedule-item/ScheduleItem';
import moment from 'moment';
import styles from './WeekEventList.module.scss';

interface Props {
	data?: { startAt: string; endAt: string }[];
}

const weeksDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const oneHourHeight = 91;
const WeekEventList = ({ data }: Props) => {
	return (
		<div className={styles.container}>
			<div style={{ minWidth: 75, maxWidth: 75 }} />
			{weeksDay.map((day, index) => {
				return (
					<div className={styles.dayEvents} key={index}>
						{data?.map((event, index) => {
							const startAt = moment(event.startAt);
							const endAt = moment(event.endAt);
							const top = startAt.hours() * oneHourHeight + (startAt.minutes() * oneHourHeight) / 60 + 3;
							const diff = endAt.diff(startAt, 'minutes');
							const height = (diff * oneHourHeight) / 60 - 1;
							return (
								<div key={index} className={styles.event} style={{ top, height }}>
									<ScheduleItem
										title={'GS 6 Living Onlive'}
										startAt={event.startAt}
										endAt={event.endAt}
									/>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
export default WeekEventList;
