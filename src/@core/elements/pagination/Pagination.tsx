import { Pagination as AntdPagination, PaginationProps as AntdPaginationProps } from 'antd';
import lodash from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './Pagination.module.scss';

const defaultPerPage = 10;

export interface IPagination {
	page: number;
	perPage: number;
	totalRecords: number;
	totalPages: number;
}
interface Props extends AntdPaginationProps {
	pagination?: IPagination;
}

const Pagination = ({ pagination, ...props }: Props) => {
	const router = useRouter();

	const currentPage = Number(router.query.page) || 0;

	const currentPerPage = Number(router.query.perPage) || defaultPerPage;

	const totalRecords = Number(pagination?.totalRecords) || 0;

	const handleChange = (page: number, perPage: number) => {
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					page: page,
					perPage: perPage,
				},
			},
			undefined,
			{ shallow: true },
		);
	};

	useEffect(() => {
		if (!router.isReady) return;

		const pageFilter = { page: 1, perPage: defaultPerPage };

		const query = { ...pageFilter, ...router.query };

		if (lodash.isEqual(query, router.query)) return;

		router.replace(
			{
				pathname: router.pathname,
				query: { ...router.query, ...query },
			},
			undefined,
			{ shallow: true },
		);
	}, [router.query]);

	const start = currentPage * currentPerPage - currentPerPage + 1;
	const end = Math.min(currentPage * currentPerPage, totalRecords);
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				{start}-{end} of {totalRecords} items
			</div>
			<AntdPagination
				className={styles.pagination}
				total={totalRecords}
				showLessItems
				showSizeChanger
				pageSizeOptions={[10, 20, 30, 50, 100]}
				// defaultPageSize={defaultPerPage}
				// showQuickJumper
				locale={{
					// jump_to: 'Trang',
					// page: '',
					items_per_page: '',
				}}
				current={currentPage}
				onChange={handleChange}
			/>
		</div>
	);
};

export default Pagination;
