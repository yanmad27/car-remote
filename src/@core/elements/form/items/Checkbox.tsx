import FormItem from '@core/elements/form/FormItem';
import { Checkbox as AntdCheckbox } from 'antd';

interface Props {
	name: string;
	label?: string;
	rules?: any;
	[key: string]: any;
	options: any[];
}

const Checkbox = ({ ...props }: Props) => {
	let inputRender = ({ field }: any) => (
		<div>
			<AntdCheckbox.Group {...field} />
		</div>
	);

	return <FormItem {...props} inputRender={inputRender} />;
};

export default Checkbox;
