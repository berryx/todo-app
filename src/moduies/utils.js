/**
 *
 * @param {Date} date
 * @return {string} return the date in locale format as string (ex: "24/04/2023" in fr)
 */
function dateToLocaleString(date) {
    return date.toLocaleDateString().slice(0, 10);
}

function localeDateStringToIsoDateString(date){
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

function isSameDay(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDay() === dateB.getDay();
}

const getWeekNum = (date) => {
    const janFirst = new Date(date.getFullYear(), 0, 1);
    // Source: https://stackoverflow.com/a/27125580/3307678
    return Math.ceil((((date.getTime() - janFirst.getTime()) / 86400000) + janFirst.getDay() + 1) / 7);
};

function isSameWeek(dateA, dateB) {
    return getWeekNum(dateA) === getWeekNum(dateB);
}

function isSameMonth(dateA, dateB){
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

export {dateToLocaleString, localeDateStringToIsoDateString, isSameDay, isSameWeek, isSameMonth};