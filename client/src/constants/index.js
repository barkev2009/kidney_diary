const PUBLIC_URL = '/apps/kidney_diary';
export const AUTH_ROUTE = PUBLIC_URL + '/auth';
export const REGISTER_ROUTE = PUBLIC_URL + '/register';
export const MAIN_ROUTE = PUBLIC_URL + '/main/:id';

export const CUR_PAGE_COOKIE = 'curPageKidneyDiary';

export const WEEKDAYS = [
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
]
export const MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

export const SELECT_ITEMS = [
    {
        value: 'water',
        name: 'Вода'
    },
    {
        value: 'steps',
        name: 'Шаги'
    }
]

export const TILE_ITEMS = [...SELECT_ITEMS, { value: 'total', name: 'Общий' }]