'use strict';

import * as types from './actionTypes';

export function loadFlights() {
    return {type: types.LOAD_ALL_FLIGHTS_REQUEST};
}