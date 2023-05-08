'use client';
import { Col, Row } from 'antd';
import Button from 'elements/button/Button';
import styles from './page.module.scss';

export default function Page() {
	return (
		<div className={styles.container}>
			<Row gutter={[24, 24]}>
				<Col span={12}>
					<Button icon={'1'} label="Button 1" />
				</Col>
				<Col span={12}>
					<Button icon={'2'} label="Button 2" />
				</Col>
				<Col span={12}>
					<Button icon={'3'} label="Button 3" />
				</Col>
				<Col span={12}>
					<Button icon={'4'} label="Button 4" />
				</Col>
				<Col span={12}>
					<Button icon={'5'} label="Button 5" />
				</Col>
				<Col span={12}>
					<Button icon={'6'} label="Button 6" />
				</Col>
			</Row>
		</div>
	);
}
