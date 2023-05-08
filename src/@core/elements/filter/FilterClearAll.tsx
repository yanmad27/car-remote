import Button from '@core/elements/button';
import { useFiltersContext } from '@core/elements/filter/Filters';
import { InputProps } from 'antd';
import { useRouter } from 'next/router';

interface Props extends InputProps {}

const FilterClearAll = ({}: Props) => {
	const router = useRouter();
	const { filterNames } = useFiltersContext();

	const handleClearAll = () => {
		const query: any = { ...router.query };
		filterNames.forEach((filterName) => delete query[filterName]);

		router.replace(
			{
				pathname: router.pathname,
				query,
			},
			undefined,
			{ shallow: true },
		);
	};
	if (Object.keys(router.query).every((query) => !filterNames.includes(query))) return null;

	return (
		<Button
			type={'link'}
			onClick={handleClearAll}
			style={{ width: 'fit-content', color: 'red', paddingLeft: 0, paddingRight: 0, marginTop: '22.5px' }}
		>
			X
		</Button>
	);
};

export default FilterClearAll;
