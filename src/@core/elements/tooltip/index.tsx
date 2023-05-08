import { Tooltip as AntdTooltip } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Props {
	children?: any;
}

const Tooltip: React.FC<Props> = (props) => {
	let textRef;
	const childrenStyle = props?.children?.props?.style || {};
	const ellipsisStyle = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };

	return (
		<AntdTooltip overlayClassName={styles.container} overlayStyle={{ borderRadius: 8 }} {...props}>
			{React.cloneElement(props.children, {
				ref: (ref: any) => (textRef = ref),
				style: { ...childrenStyle, ...ellipsisStyle },
			})}
		</AntdTooltip>
	);
};

export default Tooltip;
