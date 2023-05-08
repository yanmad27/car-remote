import styles from '@core/elements/filter/FilterItem.module.scss';
import { isEmpty } from '@core/utils';
import { InputProps } from 'antd';
import lodash from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDebounce } from 'react-use';

interface Props extends InputProps {
	name: string;
	label?: string;
	children: React.ReactNode;
	value: string;
	setValue: (value: any) => void;
	internalLabel?: string;
}

const FilterItem = ({ name, children, value, setValue, label, internalLabel }: Props) => {
	const router = useRouter();

	useEffect(() => {
		const value = name.toLowerCase().includes('id') ? Number(router.query[name]) : router.query[name]?.toString();
		isEmpty(value) && setValue(value);
	}, [router]);

	useDebounce(
		() => {
			const query: any = { ...router.query, [name]: value };
			if (isEmpty(value)) delete query[name];
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
		[value],
	);

	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			{children}
		</div>
	);
};

export default FilterItem;
