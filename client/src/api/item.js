import { $authHost, $host } from '../web';

export const getByDateAPI = async ({ uuid, date }) => {
    const { data } = await $host.post('api/item/get_create/' + uuid, { date });
    return data;
}
