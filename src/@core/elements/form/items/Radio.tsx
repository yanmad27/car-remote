import FormItem from '@core/elements/form/FormItem';
import { Radio as AntdRadio } from 'antd';

interface Props {
	name: string;
	label?: string;
	rules?: any;
	[key: string]: any;
	options: any[];
}

const Radio = ({ ...props }: Props) => {
	let inputRender = ({ field }: any) => (
		<div>
			<AntdRadio.Group {...field} />
		</div>
	);

	return <FormItem {...props} inputRender={inputRender} />;
};

export default Radio;
