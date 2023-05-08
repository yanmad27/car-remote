import FormItem from '@core/elements/form/FormItem';
import { Input as AntdInput } from 'antd';

const { TextArea: AntdTextArea } = AntdInput;
interface Props {
	name: string;
	label?: string;
	rules?: any;
	[key: string]: any;
}

const TextArea = ({ ...props }: Props) => {
	let inputRender = ({ field }: any) => <AntdTextArea {...field} />;
	return <FormItem {...props} inputRender={inputRender} />;
};

export default TextArea;
