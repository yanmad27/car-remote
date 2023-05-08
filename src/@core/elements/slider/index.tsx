// import OutsideFormInput from '@core/elements/form/outside-form-input';
import { Col, Row, Slider as AntdSlider } from 'antd';
import { SliderBaseProps } from 'antd/lib/slider';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props extends SliderBaseProps {
	label?: string;
	value?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	defaultValue?: number;
}
const Slider = ({ label, value, onChange, min = 0, max = 100, defaultValue = 0, ...props }: Props) => {
	const [inputValue, setInputValue] = useState(defaultValue);

	const handleChange = (newValue: number) => {
		setInputValue(newValue);
		onChange && onChange(newValue);
	};

	useEffect(() => {
		!!value && setInputValue(value);
	}, [value]);

	const handleInputChange = (e: any) => {
		let value = Number(e.target.value);
		if (isNaN(value)) value = 0;
		if (value < min) value = min;
		if (value > max) value = max;
		setInputValue(value);
		onChange && onChange(value);
	};

	return (
		<Row className={styles.container}>
			<Col span={24}>
				<Row justify={'space-between'} align={'middle'}>
					<Col>
						<div className={styles.label}>{label}</div>
					</Col>
					<Col>
						{/* <OutsideFormInput
							type={'number'}
							min={min}
							max={max}
							style={{ width: 50, padding: '2px 4px', textAlign: 'center' }}
							value={inputValue}
							onChange={handleInputChange}
						/> */}
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<AntdSlider
					min={min}
					max={max}
					onChange={handleChange}
					value={typeof inputValue === 'number' ? inputValue : 0}
				/>
			</Col>
		</Row>
	);
};

export default Slider;
