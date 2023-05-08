import React, { useState } from 'react';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';
import { useDebounce } from 'react-use';
import styles from './index.module.scss';

interface Props {
	color: any;
	onChange: any;
}

const ColorPicker: React.FC<Props> = ({ color, onChange }) => {
	const [internalColor, setInternalColor] = useState<RgbaColor>(color);

	useDebounce(
		() => {
			const toRgba = (rgbaStr: string) => {
				if (!rgbaStr) return { r: 0, g: 0, b: 0, a: 1 };
				const rgba = rgbaStr.replace('rgba(', '').replace(')', '').split(',');
				return {
					r: Number(rgba[0]),
					g: Number(rgba[1]),
					b: Number(rgba[2]),
					a: Number(rgba[3]),
				};
			};
			setInternalColor(toRgba(color));
		},
		1000,
		[color],
	);

	return (
		<div className={styles.container}>
			<RgbaColorPicker className={styles.rgbaPicker} color={internalColor} onChange={onChange} />
			{/* <HexAlphaColorPicker className={styles.hexInput} color={internalColor} onChange={onChange} /> */}
		</div>
	);
};

export default ColorPicker;
