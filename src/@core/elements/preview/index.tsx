import { Modal, ModalProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Props extends ModalProps {}

const Preview: React.FC<Props> = (props) => {
	return (
		<Modal className={styles.container} centered footer={null} closable={true} width={1000} {...props}>
			{props.children}
		</Modal>
	);
};

export default Preview;
