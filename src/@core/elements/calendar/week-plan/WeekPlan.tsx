import { DownloadOutlined } from '@ant-design/icons';
import Button from '@core/elements/button';
import { useCalendarContext } from '@core/elements/calendar/Calendar';
import WeekEventList from '@core/elements/calendar/week-event-list/WeekEventList';
import { mergeClassName } from '@core/utils';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment, { Moment } from 'moment';
import { ChevronIcon } from 'shared/icons/ChevronIcon';
import styles from './WeekPlan.module.scss';

interface Props {
	data?: { startAt: string; endAt: string }[];
}

const DateSelect = ({}: any) => {
	const { value, setValue, week } = useCalendarContext();
	const weekDays = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'];
	const onDateClick = (date: Moment) => {
		setValue(date);
	};
	return (
		<div className={styles.weekDays}>
			<div className={styles.day} />
			{weekDays.map((el, index) => {
				const startWeek = moment().weeks(week).startOf('week').add(1, 'days');
				const date = startWeek.add(index, 'days');

				return (
					<div
						key={date.unix()}
						className={mergeClassName(styles.day, date.isSame(value, 'day') ? styles.now : '')}
					>
						<div className={styles.dayInfo} onClick={() => onDateClick(date)}>
							<div className={styles.dayName}>{el}</div>
							<div className={styles.dayNumber}>{date.date()}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const height = 75;
const oneHourHeight = height + 2;
const oneHourEventHeight = oneHourHeight + 16;
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const WeekPlan = ({ data }: Props) => {
	const { value, setValue, setWeek } = useCalendarContext();

	const handleNow = () => {
		setValue(moment());
		setWeek(moment().week());
	};
	const handlePrev = () => {
		const newValue = value.clone().add(-1, 'week');
		setValue(newValue);
		setWeek(newValue.week());
	};
	const handleNext = () => {
		const newValue = value.clone().add(1, 'week');
		setValue(newValue);
		setWeek(newValue.week());
	};
	const handleChange = (_: any, dateString: string) => {
		const newValue = moment(dateString, 'DD/MM/YYYY');
		setValue(newValue);
		setWeek(newValue.week());
	};

	return (
		<div>
			<div className={styles.actions}>
				<div>
					<Button styleType={'cancel'} onClick={handleNow}>
						Hôm nay
					</Button>
					<Button styleType={'cancel'} className={styles.prev} onClick={handlePrev}>
						<ChevronIcon deg={270} />
					</Button>
					<Button styleType={'cancel'} className={styles.next} onClick={handleNext}>
						<ChevronIcon deg={90} />
					</Button>
					<DatePicker
						allowClear={false}
						value={dayjs(value.toISOString())}
						placeholder={'Chọn ngày'}
						onChange={handleChange}
						format={'DD/MM/YYYY'}
					/>
				</div>

				<Button styleType={'cancel'} style={{ justifySelf: 'flex-end' }} prefixIcon={<DownloadOutlined />}>
					Tải xuống
				</Button>
			</div>
			<div className={styles.container}>
				<DateSelect />
				<div className={styles.timeScroll}>
					<div className={styles.timeWrapper}>
						<div className={styles.time} />
						{weekDays.map((el, index) => {
							return <div key={index} className={styles.time} />;
						})}
						<div className={styles.timeline}>
							{time.map((el, index) => {
								return (
									<div key={index} className={styles.hour}>
										{moment().startOf('day').add(el, 'hours').format('HH:mm')}
										<div />
									</div>
								);
							})}
							<div className={styles.hour} />
						</div>
						<WeekEventList data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default WeekPlan;
