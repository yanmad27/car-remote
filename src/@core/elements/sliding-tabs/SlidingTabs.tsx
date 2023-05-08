import { mergeClassName } from '@core/utils';
import { useEffect, useState } from 'react';
import styles from './SlidingTabs.module.scss';

interface Item {
	key: any;
	content: React.ReactNode;
}
interface Props {
	items: Item[];
	defaultKey?: any;
	onClick?: (key?: any, item?: Item) => void;
	[key: string]: any;
}

const SlidingTabs = (props: Props) => {
	const [index, setIndex] = useState(0);
	useEffect(() => {
		let defaultIndex = props.items.findIndex((item) => item.key === props.defaultKey);
		if (defaultIndex === -1) defaultIndex = 0;
		setIndex(defaultIndex);
	}, [props.defaultKey]);
	const handleClick = (item: Item, index: number) => {
		setIndex(index);
		props.onClick && props.onClick(item.key, item);
	};
	return (
		<div className={mergeClassName(styles.container, props.className)}>
			{props.items.map((item, index) => {
				return (
					<div key={item.key} className={styles.content} onClick={() => handleClick(item, index)}>
						{item.content}
					</div>
				);
			})}
			<div className={styles.switcher} style={{ transform: `translateX(${index * 100}%)` }} />
		</div>
	);
};
export default SlidingTabs;
