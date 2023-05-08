import api from './api';
import { endpoint, IEntity } from './interface';
import swr from './swr';

const ModuleApi = { api, swr, endpoint };
export type IModule = IEntity;
export default ModuleApi;
