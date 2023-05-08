import FilterItem from '@core/elements/filter/FilterItem';
import { Input, InputProps } from 'antd';
import { useState } from 'react';

interface Props extends InputProps {
	name: string;
	label?: string;
}

const FilterSearch = (props: Props) => {
	const [value, setValue] = useState<string>('');
	return (
		<FilterItem {...props} value={value} setValue={setValue}>
			<Input value={value} onChange={(e: any) => setValue(e.target.value)} {...props} />
		</FilterItem>
	);
};

export default FilterSearch;
