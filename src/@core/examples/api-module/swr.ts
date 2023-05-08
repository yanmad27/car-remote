import { IPagination } from '@core/elements/pagination/Pagination';
import swr from '@core/swr';
import { getEndpoint } from '@core/utils';
import { endpoint, IEntity } from './interface';

const useOne = (id: string) => swr<IEntity>(getEndpoint(`${endpoint}/${id}`));

const useAll = (queries?: any) => swr<IEntity[], IPagination>(getEndpoint(endpoint, queries));

export default {
	useOne,
	useAll,
};
