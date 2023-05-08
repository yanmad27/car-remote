import styles from './Button.module.scss';

interface Props {
	icon: any;
	label?: string;
}

const Button = (props: Props) => {
	return (
		<div className={styles.element}>
			<div className={styles.button}>{props.icon}</div>
			{props.label && <div className={styles.label}>{props.label}</div>}
		</div>
	);
};
export default Button;
