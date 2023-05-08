import DatePicker from '@core/elements/calendar/date-picker/DatePicker';
import DatePlan from '@core/elements/calendar/date-plan/DatePlan';
import WeekPlan from '@core/elements/calendar/week-plan/WeekPlan';
import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import styles from './Calendar.module.scss';

interface CalendarContextProps {
	value: Moment;
	setValue: any;
	week: number;
	setWeek: any;
}

const CalendarContext = React.createContext<CalendarContextProps>({
	value: moment(),
	setValue: () => {},
	week: moment().week(),
	setWeek: () => {},
});
export const useCalendarContext = () => React.useContext(CalendarContext);

interface Props {
	type?: 'date' | 'week';
	data?: { startAt: string; endAt: string }[];
}

const Calendar = ({ type = 'date', data = [] }: Props) => {
	const [value, setValue] = useState<Moment>(moment());
	const [week, setWeek] = useState<number>(moment().week());

	return (
		<CalendarContext.Provider value={useMemo(() => ({ value, setValue, week, setWeek }), [value, week])}>
			{type === 'date' && (
				<>
					<div className={styles.calendar}>
						<DatePicker />
					</div>
					<div className={styles.plan}>
						<DatePlan data={data} />
					</div>
				</>
			)}
			{type === 'week' && <WeekPlan data={data} />}
		</CalendarContext.Provider>
	);
};
export default Calendar;
