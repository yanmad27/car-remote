// import { ThreeDotIcon24px } from 'share/icons/three-dot';
import { Dropdown as AntdDropdown, DropdownProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Props extends DropdownProps {}

const JDropdown: React.FC<Props> = (props: Props) => {
	return (
		<AntdDropdown
			overlayClassName={styles.container}
			placement="bottomRight"
			getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
			{...props}
		>
			<span style={{ color: '#fff' }}>{/* <ThreeDotIcon24px /> */}</span>
		</AntdDropdown>
	);
};

export default JDropdown;
