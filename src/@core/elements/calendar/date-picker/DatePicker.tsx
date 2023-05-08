import { useCalendarContext } from '@core/elements/calendar/Calendar';
import { mergeClassName } from '@core/utils';
import moment, { Moment } from 'moment';
import { ChevronIcon } from 'shared/icons/ChevronIcon';
import styles from './DatePicker.module.scss';
interface Props {}

const DateSelect = ({}: any) => {
	const { value, setValue, week } = useCalendarContext();
	const days = ['H', 'B', 'T', 'N', 'S', 'B', 'CN'];
	const onDateClick = (date: Moment) => {
		setValue(date);
	};
	return (
		<div className={styles.selectDate}>
			{days.map((dayStr, index: any) => {
				const dateString = moment().week(week).startOf('week').add(index, 'days').date();
				const dateMoment = moment().week(week).date(dateString);
				const isSameDate = value.isSame(dateMoment, 'date');
				const isSameMonth = value.isSame(dateMoment, 'month');
				const isSameYear = value.isSame(dateMoment, 'year');
				const isSelected = isSameDate && isSameMonth && isSameYear;
				return (
					<div
						key={dayStr + index}
						className={mergeClassName(styles.item, isSelected ? styles.selected : '')}
						onClick={() => onDateClick(dateMoment)}
					>
						<div className={styles.day}>{dayStr}</div>
						<div className={styles.date}>{dateString}</div>
					</div>
				);
			})}
		</div>
	);
};

const DatePicker = (props: Props) => {
	const { value, setValue, week, setWeek } = useCalendarContext();
	const handleNext = () => setWeek(week + 1);
	const handlePrev = () => setWeek(week - 1);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.btn} onClick={handlePrev}>
					<ChevronIcon deg={270} />
				</div>
				<div>
					<span>Tháng {moment().week(week).format('MM')}</span>
					<span> {moment().week(week).format('YYYY')}</span>
				</div>
				<div className={styles.btn} onClick={handleNext}>
					<ChevronIcon deg={90} />
				</div>
			</div>
			<div className={styles.body}>
				<DateSelect />
			</div>
		</div>
	);
};

export default DatePicker;
