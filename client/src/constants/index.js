export const AUTH_ROUTE = '/auth';
export const REGISTER_ROUTE = '/register';
export const MAIN_ROUTE = '/main/:id';

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