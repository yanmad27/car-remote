import { FilterOutlined } from '@ant-design/icons';
import { Collapse as AntdCollapse, CollapseProps } from 'antd';
import styles from './index.module.scss';

const { Panel: AntdPanel } = AntdCollapse;
interface Props extends CollapseProps {
	header?: any;
	children?: any;
	defaultOpen?: boolean;
}

const style = {
	top: 8,
	userSelect: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const ExpandIcon = (props: any) => {
	const text = props.collapseText || 'bộ lọc';
	return (
		<span {...props} style={style}>
			<FilterOutlined />
			{props.isActive ? <span> Ẩn {text ?? ''}</span> : <span>Hiện bộ lọc</span>}
		</span>
	);
};

const Collapse: React.FC<Props> = (props) => {
	return (
		<AntdCollapse
			className={styles.container}
			defaultActiveKey={props.defaultOpen ? ['1'] : []}
			expandIconPosition={'start'}
			expandIcon={(panelProps) => <ExpandIcon {...panelProps} />}
			ghost
			{...props}
		>
			<AntdPanel header={props.header} key="1">
				{props.children}
			</AntdPanel>
		</AntdCollapse>
	);
};

export default Collapse;
