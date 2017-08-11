'use strict';

import {put, call} from 'redux-saga/effects';
import {getAllFlights} from '../api/flightsAPI';
import * as types from '../actions/actionTypes';

export default function* loadAllFlights() {
    try {
        const flights = yield call(getAllFlights);
        yield put({type: types.LOAD_ALL_FLIGHTS_SUCCESS, flights});
    } catch (error) {
        yield put({type: types.LOAD_ALL_FLIGHTS_ERROR, error});
    }
}