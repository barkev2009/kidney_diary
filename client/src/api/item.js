import { date2String } from '../utils/date';
import { $authHost } from '../web';

export const getByDateAPI = async ({ uuid, date }) => {
    const { data } = await $authHost.post('api/item/get_create/' + uuid, { date: date2String(new Date(date)) });
    return data;
}
