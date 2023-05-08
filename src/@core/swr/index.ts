import callApi from '@core/call-api';
import { getEndpoint } from '@core/utils';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import useSWRInfinite from 'swr/infinite';

interface swrResponseList<DATA, PAGINATION> extends SWRResponse {
	data: DATA;
	pagination: PAGINATION;
	loading: boolean;
	mutate: any;
}
interface swrResponseOne<DATA> extends SWRResponse {
	data: DATA;
	loading: boolean;
	mutate: any;
}

const getKey = (endpoint: string, query: any) => (pageIndex: number, previousPageData: any) => {
	if (previousPageData && !previousPageData.length) return null;
	return getEndpoint(endpoint, { ...query, perPage: query?.perPage || 10, page: pageIndex });
};

export const swrInfinite = (endpoint: string, query?: any, options?: SWRConfiguration, fetcher = callApi) => {
	const { data, size, setSize, ...results } = useSWRInfinite(getKey(endpoint, query), endpoint?.includes('undefined') ? null : fetcher, options);
	return {
		data: data?.flat(),
		page: size,
		setPage: setSize,
		...results,
	};
};

function swr<DATA>(...argus: any): swrResponseOne<DATA>;
function swr<DATA, PAGINATION>(...argus: any): swrResponseList<DATA, PAGINATION>;

function swr<DATA, PAGINATION>(endpoint: string, options?: SWRConfiguration, fetcher = callApi): any {
	const { data, error, ...props } = useSWR(endpoint, endpoint?.includes('undefined') || endpoint?.includes('null') ? null : fetcher, options);

	return {
		data: data?.data as DATA,
		pagination: data?.pagination as PAGINATION,
		error: error?.response?.data,
		loading: !error && !data,
		...props,
	};
}
// const swr = <T>(endpoint: string, options?: SWRConfiguration, fetcher = callApi): swrResponseOne<T> => {
// 	const { data, error, ...props } = useSWR(endpoint, endpoint?.includes('undefined') ? null : fetcher, options);

// 	return {
// 		data: data?.data as T,
// 		pagination: data?.pagination,
// 		loading: !error && !data,
// 		isError: error,
// 		...props,
// 	};
// };

export default swr;
