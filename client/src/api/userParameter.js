import { $authHost } from '../web';

export const getParamsByUserAPI = async ({ uuid }) => {
    const { data } = await $authHost.get('api/userParameter/user/' + uuid);
    return data;
}

export const createParamAPI = async ({ uuid, limit_min, limit_max, rating, type }) => {
    const { data } = await $authHost.post('api/userParameter', { uuid, limit_min, limit_max, rating, type });
    return data;
}

export const editParamAPI = async ({ uuid, limit_min, limit_max, rating, type }) => {
    const { data } = await $authHost.put('api/userParameter/' + uuid, { limit_min, limit_max, rating, type });
    return data;
}

export const deleteParamAPI = async ({ uuid }) => {
    const { data } = await $authHost.delete('api/userParameter/' + uuid);
    return data;
}
