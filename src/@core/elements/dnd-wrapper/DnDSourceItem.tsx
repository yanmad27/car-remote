import type { DragSourceMonitor } from 'react-dnd';
import { useDrag } from 'react-dnd';

interface Props {
	type: string;
	name: string;
	children: React.ReactNode;
	end?: (item: any, monitor: any, dropResult: any) => void;
	[key: string]: any;
}

export const DnDSourceItem = ({ type, name, end, ...props }: Props) => {
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: type,
			item: { name },
			end(item, monitor) {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					end && end(dropResult, item, monitor);
				}
			},
			collect: (monitor: DragSourceMonitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
		}),
		[name, props],
	);

	return (
		<div ref={drag} style={{ width: '100%', height: '100%', opacity }}>
			{props.children}
		</div>
	);
};
