import FormItem from '@core/elements/form/FormItem';
import { DatePicker as AntdDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
	name: string;
	label?: string;
	rules?: any;
	[key: string]: any;
}

const DatePicker = ({ ...props }: Props) => {
	const { watch } = useFormContext();
	const [value, setValue] = useState('');
	const watchValue = watch(props.name);
	useEffect(() => {
		setValue(watchValue);
	}, [watchValue]);
	let inputRender = ({ field }: any) => {
		const onChange = (date: Dayjs, dateString: any) => {
			const stringValue = date.toISOString();
			setValue(stringValue);
			field.onChange(stringValue);
		};
		return (
			<div>
				<AntdDatePicker
					placeholder={'Chọn ngày'}
					format={'DD/MM/YYYY'}
					{...field}
					value={value ? dayjs(value) : null}
					onChange={onChange}
				/>
			</div>
		);
	};

	return <FormItem {...props} inputRender={inputRender} />;
};

export default DatePicker;
