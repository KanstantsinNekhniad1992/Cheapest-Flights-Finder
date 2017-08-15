'use strict';

import * as types from './actionTypes';

export function loadFlights() {
    return {type: types.LOAD_ALL_FLIGHTS_REQUEST};
}

export function getTickets(payload) {
    return {type: types.GET_TICKETS_REQUEST, payload};
}