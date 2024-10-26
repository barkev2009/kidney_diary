Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function getDateWeek(date) {
    const currentDate =
        (typeof date === 'object') ? date : new Date();
    // console.log('currentDate: ' + currentDate);
    const januaryFirst =
        new Date(currentDate.getFullYear(), 0, 1);
    // console.log('januaryFirst: ' + januaryFirst);
    const daysToNextMonday =
        (januaryFirst.getDay() === 0) ? 1 :
            (8 - januaryFirst.getDay());
    // console.log('daysToNextMonday: ' + daysToNextMonday);
    const nextMonday =
        new Date(currentDate.getFullYear(), 0,
            1 + daysToNextMonday);
    // console.log('nextMonday: ' + nextMonday);

    return (currentDate < nextMonday) ? 0 :
        (currentDate > nextMonday ? Math.ceil(
            (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 0);
}

export function date2String(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, 0) + '-' + String(date.getDate()).padStart(2, 0)
}

export function getDateByYearWeekDay(year, y, x) {
    const januaryFirst =
        new Date(year, 0, 1);
    const x0 = januaryFirst.getDay() === 0 ? 6 : januaryFirst.getDay() - 1;
    const numOfDays = y * 7 + (x - x0);
    return januaryFirst.addDays(numOfDays);
}