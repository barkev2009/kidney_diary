import { $authHost } from '../web';

export const getParamsByUserAPI = async ({ uuid }) => {
    const { data } = await $authHost.get('api/userParameter/user/' + uuid);
    return data;
}

export const createParamAPI = async ({ uuid, water_min, water_max, water_rating, steps_min, steps_max, steps_rating }) => {
    const { data } = await $authHost.post('api/userParameter', { uuid, water_min, water_max, water_rating, steps_min, steps_max, steps_rating });
    return data;
}

export const editParamAPI = async ({ uuid, water_min, water_max, water_rating, steps_min, steps_max, steps_rating }) => {
    const { data } = await $authHost.put('api/userParameter/' + uuid, { water_min, water_max, water_rating, steps_min, steps_max, steps_rating });
    return data;
}

export const deleteParamAPI = async ({ uuid }) => {
    const { data } = await $authHost.delete('api/userParameter/' + uuid);
    return data;
}
