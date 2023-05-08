import callApi from '@core/call-api';
import { getEndpoint } from '@core/utils';
import { endpoint, IEntity } from './interface';

const getOne = (id: any) => callApi(getEndpoint(`${endpoint}/${id}`), 'GET');

const getAll = (query?: any) => callApi(getEndpoint(endpoint, query), 'GET');

const createOne = (data: IEntity) => callApi(getEndpoint(endpoint), 'POST', data);

const updateOne = (id: any, data: IEntity) => callApi(getEndpoint(`${endpoint}/${id}`), 'PATCH', data);

const deleteOne = (id: any) => callApi(getEndpoint(`${endpoint}/${id}`), 'DELETE');

export default {
	getOne,
	getAll,
	createOne,
	updateOne,
	deleteOne,
};
