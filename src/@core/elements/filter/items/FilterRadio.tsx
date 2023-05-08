import FilterItem from '@core/elements/filter/FilterItem';
import { InputProps, Radio } from 'antd';
import { useState } from 'react';

const style = {
	height: 32,
	display: 'flex',
	alignItems: 'center',
};
interface Props extends InputProps {
	name: string;
	label?: string;
	options: { label: string; value: any }[];
	placeholder?: string;
}

const FilterRadio = (props: Props) => {
	const [value, setValue] = useState<any>();
	return (
		<FilterItem {...props} value={value} setValue={setValue}>
			<Radio.Group
				style={style}
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
				options={props.options}
			/>
		</FilterItem>
	);
};

export default FilterRadio;
