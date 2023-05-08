// import { CategoryIcon } from 'share/icons/category';
// import { DeleteIcon24px } from 'share/icons/delete';
// import { NewFileIcon24px } from 'share/icons/new-file';
// import { CloseIcon24px } from 'share/icons/view';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import styles from './index.module.scss';

const { confirm } = AntdModal;
interface Props extends AntdModalProps {
	icon?: 'delete' | 'view' | 'new' | any;
	content?: React.ReactNode;
	onOk?: () => void;
	onCancel?: () => void;
}

const IconWrapper = ({ icon }: any) => {
	const backgroundObj: any = {
		delete: '#F55050',
		view: '#F55050',
		new: '#6D5CFF',
		category: '#6D5CFF',
	};
	return (
		<div
			style={{
				width: 40,
				height: 40,
				borderRadius: '50%',
				color: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: backgroundObj[icon],
			}}
		>
			{/* {icon === 'delete' && <DeleteIcon24px />} */}
			{/* {icon === 'view' && <DeleteIcon24px />} */}
			{/* {icon === 'new' && <NewFileIcon24px />} */}
			{/* {icon === 'category' && <CategoryIcon />} */}
		</div>
	);
};
export const openModal = (props: Props) => {
	confirm({
		wrapClassName: styles.container,
		title: (
			<span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
				{props?.icon && <IconWrapper icon={props.icon} />}
				{props?.title || 'Do you want to delete these items?'}
			</span>
		),
		content: props?.content || 'Some descriptions',
		centered: true,
		closable: true,
		width: 600,
		onOk() {
			props.onOk && props.onOk();
		},
		onCancel() {
			props.onCancel && props.onCancel();
		},
		// closeIcon: <CloseIcon24px />,
	});
};

export const Modal = ({ ...props }: Props) => {
	return (
		<AntdModal
			centered
			closable
			width={600}
			{...props}
			wrapClassName={`${styles.container} ${props?.wrapClassName || ''}`}
			title={
				<span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					{props?.icon && <IconWrapper icon={props.icon} />}
					{props?.title || 'Do you Want to delete these items?'}
				</span>
			}
			// closeIcon={<CloseIcon24px />}
		/>
	);
};
