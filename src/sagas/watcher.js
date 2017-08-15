'use strict';

import {takeEvery} from 'redux-saga';
import {loadAllFlights, getTickets} from './flightsSaga';
import * as types from '../actions/actionTypes';

export function* watchFlightsRequest() {
    yield* takeEvery(types.LOAD_ALL_FLIGHTS_REQUEST, loadAllFlights);
}

export function* watchTicketsRequest() {
	yield* takeEvery(types.GET_TICKETS_REQUEST, getTickets);
}