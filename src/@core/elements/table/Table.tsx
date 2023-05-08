import { SearchOutlined } from '@ant-design/icons';
import FilterSearch from '@core/elements/filter/items/FilterSearch';
import Pagination, { IPagination } from '@core/elements/pagination/Pagination';
import Spin from '@core/elements/spin';
import { isEmpty, mergeClassName } from '@core/utils';
import { Table as AntdTable, TableProps } from 'antd';
import lodash from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import styles from './Table.module.scss';

interface Props extends Omit<TableProps<any>, 'pagination'> {
	pagination?: IPagination;
}

const SORT_BY_QUERY = 'sortBy';

const Table = (props: Props) => {
	const router = useRouter();

	const [sortedInfo, setSortedInfo] = useState<any>([]);

	const handleSortChange = (sorter: any) => {
		setSortedInfo([sorter].flat(1));
	};

	useEffect(() => {
		const sortQuery = router.query[SORT_BY_QUERY]?.toString();
		const sortArray = sortQuery?.split(',').map((item: any) => {
			const [field, order] = item.split('.');
			return { field, order: order + 'end' };
		});
		setSortedInfo(sortArray);
	}, [router]);

	useDebounce(
		() => {
			const validSorters = sortedInfo?.filter((item: any) => item?.order);
			const sortQuery = validSorters
				?.map((item: any) => `${item?.field}.${item?.order.replace('end', '')}`)
				?.join(',');
			const query: any = { ...router.query, [SORT_BY_QUERY]: sortQuery };

			if (isEmpty(sortQuery)) delete query[SORT_BY_QUERY];
			if (lodash.isEqual(query, router.query)) return;

			router.replace(
				{
					pathname: router.pathname,
					query,
				},
				undefined,
				{ shallow: true },
			);
		},
		300,
		[sortedInfo],
	);

	const handleChange = (_: any, __: any, sorter: any) => {
		handleSortChange(sorter);
	};

	const columns: any = props?.columns?.map((item: any) => {
		const searchKey = 'search_' + item?.dataIndex;
		const filtered = !!router.query[searchKey];

		if (item.api_filter)
			item = {
				...item,
				filterDropdown: () => <FilterSearch name={searchKey} />,
				filterIcon: () => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			};

		if (item.api_sorter) {
			item = {
				...item,
				sorter: { multiple: 1 },
				sortOrder: sortedInfo?.find((sorter: any) => sorter?.field === item?.dataIndex)?.order,
			};
		}

		return { ...item };
	});
	return (
		<>
			<div>
				<AntdTable
					rowKey={'id'}
					{...props}
					locale={{
						triggerAsc: 'Sắp xếp tăng dần',
						triggerDesc: 'Sắp xếp giảm dần',
						cancelSort: 'Huỷ sắp xếp',
					}}
					// bordered
					pagination={false}
					columns={columns}
					onChange={handleChange}
					bordered={false}
					loading={{
						indicator: <Spin />,
						spinning: !!props.loading,
					}}
					className={mergeClassName(styles.container, props?.pagination ? styles.pagination : '')}
					rowClassName={styles.row}
				/>
				{props?.pagination && <Pagination pagination={props.pagination} />}
			</div>
		</>
	);
};

export default Table;
