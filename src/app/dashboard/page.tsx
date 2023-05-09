'use client';
import Button from 'elements/button/Button';
import styles from './page.module.css';

export default function Page() {
	return (
		<div className={styles.container}>
			<Button icon={'1'} label="Button 1" />
			<Button icon={'2'} label="Button 2" />
			<Button icon={'3'} label="Button 3" />
			<Button icon={'4'} label="Button 4" />
			<Button icon={'5'} label="Button 5" />
			<Button icon={'6'} label="Button 6" />
		</div>
	);
}
