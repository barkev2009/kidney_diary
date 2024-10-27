import { date2String } from '../utils/date';
import { $authHost } from '../web';

export const getByDateAPI = async ({ uuid, date }) => {
    const { data } = await $authHost.post('api/item/get_create/' + uuid, { date: date2String(new Date(date)) });
    return data;
}

export const editItemAPI = async ({ uuid, water, steps }) => {
    const { data } = await $authHost.put('api/item/' + uuid, { water, steps });
    return data;
}

export const getByUserAPI = async ({ uuid, year }) => {
    const { data } = await $authHost.get('api/item/user_year', { params: { uuid, year } });
    return data;
}