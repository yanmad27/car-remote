import FormItem from '@core/elements/form/FormItem';
import { Select as AntdSelect, SelectProps } from 'antd';

interface Props extends SelectProps {
	name: string;
	label?: string;
	rules?: any;
	options?: any[];
	[key: string]: any;
}

const parseVietnamese = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[đĐ]/g, 'd')
		.replace(/[áàạảãâấầậẩẫăắằặẳẵ]/g, 'a')
		.replace(/[éèẹẻẽêếềệểễ]/g, 'e')
		.replace(/[íìịỉĩ]/g, 'i')
		.replace(/[óòọỏõôốồộổỗơớờợởỡ]/g, 'o')
		.replace(/[úùụủũưứừựửữ]/g, 'u')
		.replace(/[ýỳỵỷỹ]/g, 'y');
};

//vietnamese search
export const filterOption = (input: string, option: any) => {
	const label = option?.label?.toLowerCase() || '';
	const strippedLabel = parseVietnamese(label);
	return label.includes(input.toLowerCase()) || strippedLabel.includes(input.toLowerCase());
};

const Select = ({ ...props }: Props) => {
	let inputRender = ({ field }: any) => {
		const showSearch = field?.options?.length >= 7;
		return (
			<div>
				<AntdSelect
					showSearch={showSearch}
					dropdownMatchSelectWidth={false}
					filterOption={filterOption}
					{...props}
					{...field}
				/>
			</div>
		);
	};

	return <FormItem {...props} inputRender={inputRender} />;
};

export default Select;
