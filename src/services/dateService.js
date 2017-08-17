'use strict';

function normalizeDate(date) {

    if (Object.prototype.toString.call(date).slice(8, -1) === 'String') {
        date = new Date(date);
    }

    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

export {
    normalizeDate
}