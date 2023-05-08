import { Modal } from 'antd';
import React, { useState } from 'react';

interface Props {
	children: any;
}
const DeleteConfirmHOC = ({ children }: Props) => {
	const [open, setOpen] = useState(false);

	const handleChildrenClick = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setOpen(false);
		children?.props?.onClick?.();
	};

	const clonedChildren = React.cloneElement(children, {
		...children.props,
		onClick: handleChildrenClick,
	});
	return (
		<React.Fragment>
			<Modal
				// icon={<ExclamationCircleFilled />}
				centered
				title="Xác nhận xoá"
				cancelText={'Hủy'}
				okType={'danger'}
				okText={'Xoá'}
				open={open}
				onCancel={() => setOpen(false)}
				onOk={handleOk}
			>
				<div className="d-center">
					<div>Bạn có chắc chắn muốn xoá? </div>
					<div>Hành động này không thể hoàn tác.</div>
				</div>
			</Modal>
			{clonedChildren}
		</React.Fragment>
	);
};

export default DeleteConfirmHOC;
