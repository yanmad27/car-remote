import { LoadingOutlined } from '@ant-design/icons';
import { Spin as AntdSpin, SpinProps as AntdSpinProps } from 'antd';
import { ReactNode } from 'react';
import styles from './index.module.scss';
interface Props extends AntdSpinProps {
	children?: ReactNode;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'green' }} spin />;

const Spin = ({ children, ...props }: Props) => {
	return (
		<AntdSpin {...props} indicator={antIcon} wrapperClassName={styles.container}>
			{children}
		</AntdSpin>
	);
};

export default Spin;
