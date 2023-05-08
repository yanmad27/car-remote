import { displayDate } from '@core/utils';
import { useEffect, useState } from 'react';

interface Props {
	children?: string;
}

const Date = ({ children }: Props) => {
	const [formatted, setFormatted] = useState<any>();
	useEffect(() => {
		setFormatted(displayDate(children) || <i>Chưa bắt đầu</i>);
	}, [children]);
	return formatted;
};
export default Date;
