import { useDrop } from 'react-dnd';

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
	if (isActive) {
		return '#1677ff';
	} else if (canDrop) {
		return '#f1f2f4';
	}
}
interface Props {
	name: string;
	accept: string;
	children: React.ReactNode;
	[key: string]: any;
}

export const DnDTargetContainer = ({ name, accept, children, ...props }: Props) => {
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: accept,
			drop: () => ({
				name,
			}),
			collect: (monitor: any) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[accept, props],
	);

	const isActive = canDrop && isOver;
	const backgroundColor = selectBackgroundColor(isActive, canDrop);
	return (
		<div ref={drop} style={{ width: '100%', height: '100%', transition: 'all .3s ease', backgroundColor }}>
			{children}
		</div>
	);
};
