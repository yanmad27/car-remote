import React from 'react';
import styles from './index.module.scss';

interface Props {
	[key: string]: any;
}

const CustomImage: React.FC<Props> = (props) => {
	return (
		<img
			className={styles.container}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = '/assets/no-data-found.png';
			}}
			{...props}
			src={!props.src ? '/assets/no-data-found.png' : props.src}
		/>
	);
};

export default CustomImage;
