import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './Version.module.scss';

const Version = () => {
	const [version, setVersion] = useState<{ version: string; time: string }>({ version: '0.0.0', time: '' });
	useEffect(() => {
		fetch('/version.json')
			.then((response) => response.json())
			.then((data) => {
				setVersion(data);
			});
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.version}>Version {version.version}</div>
			<div className={styles.time}>{moment(version?.time).format('HH:mm:ss DD/MM/YYYY')}</div>
		</div>
	);
};

export default Version;
