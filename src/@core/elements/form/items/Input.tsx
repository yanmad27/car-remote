import FormItem from '@core/elements/form/FormItem';
import { Input as AntdInput, InputProps } from 'antd';

interface Props extends InputProps {
	name: string;
	label?: string;
	labelPosition?: 'left' | 'top';
	rules?: any;
	[key: string]: any;
}

const Input = ({ ...props }: Props) => {
	let inputRender = ({ field }: any) => <AntdInput {...props} {...field} />;

	if (props.type === 'password') {
		inputRender = ({ field }: any) => <AntdInput.Password {...props} {...field} />;
	}

	return <FormItem {...props} inputRender={inputRender} />;
};

export default Input;
