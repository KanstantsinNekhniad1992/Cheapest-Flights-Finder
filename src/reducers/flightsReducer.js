'use strict';

import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function (state = initialState.flights, action) {
    switch (action.type) {
        case types.LOAD_ALL_FLIGHTS_SUCCESS:
            return Object.assign({}, state, action.flights);
        default:
            return state;
    }
}