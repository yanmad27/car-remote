import { Empty as AntdEmpty } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

const Empty: React.FC<Props> = () => {
	return (
		<div className={styles.container}>
			<AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} />
		</div>
	);
};

export default Empty;
