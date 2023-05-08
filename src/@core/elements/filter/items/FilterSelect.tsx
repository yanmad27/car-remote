import FilterItem from '@core/elements/filter/FilterItem';
import { filterOption } from '@core/elements/form/items/Select';
import { InputProps, Select } from 'antd';
import { useState } from 'react';

interface Props extends InputProps {
	name: string;
	label?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	mode?: 'multiple';
	[key: string]: any;
}

const FilterSelect = (props: Props) => {
	const [value, setValue] = useState<any>();
	return (
		<FilterItem {...props} value={value} setValue={setValue}>
			<Select
				{...props}
				bordered={false}
				dropdownMatchSelectWidth={false}
				allowClear
				mode={props.mode}
				value={value}
				onChange={(value: any) => setValue(value)}
				options={props.options}
				placeholder={props.placeholder}
				filterOption={filterOption}
				showSearch={props?.options?.length >= 7}
			/>
		</FilterItem>
	);
};

export default FilterSelect;
