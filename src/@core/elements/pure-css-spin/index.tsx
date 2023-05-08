import { mergeClassName } from '@core/utils';
import React from 'react';
import styles from './index.module.scss';

interface Props {
	spinning?: boolean;
}

const PureCssSpin: React.FC<Props> = ({ spinning = true }) => {
	return (
		<div className={mergeClassName(styles.wrapper, spinning ? styles.show : styles.hide)}>
			<div className={styles.container}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default PureCssSpin;
