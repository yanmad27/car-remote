import { mergeClassName } from '@core/utils';
import { Button as AntdButton, ButtonProps } from 'antd';
import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props extends ButtonProps {
	prefixIcon?: ReactNode;
	suffixIcon?: ReactNode;
	htmlType?: 'button' | 'submit' | 'reset';
	styleType?: 'default' | 'cancel';
	className?: string;
	disabled?: boolean;
}

const Button = ({ children, prefixIcon, suffixIcon, htmlType, styleType = 'default', className, ...props }: Props) => {
	return (
		<AntdButton
			htmlType={htmlType}
			type={'primary'}
			{...props}
			className={mergeClassName(styles.container, className, styleType)}
		>
			{prefixIcon}
			{children}
			{suffixIcon}
		</AntdButton>
	);
};

export default Button;
