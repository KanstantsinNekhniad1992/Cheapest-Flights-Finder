'use strict';

import {put, call} from 'redux-saga/effects';
import FlightsApi from '../api/flightsAPI';
import * as types from '../actions/actionTypes';

export function* loadAllFlights() {
	try {
		const flights = yield call(FlightsApi.getAllFlights);
		yield put({type: types.LOAD_ALL_FLIGHTS_SUCCESS, flights});
	} catch (error) {
		yield put({type: types.LOAD_ALL_FLIGHTS_ERROR, error});
	}
}

export function* getTickets({payload}) {
	try {
		const data = yield call(FlightsApi.getTickets, payload);
		yield put({type: types.GET_TICKETS_SUCCESS, data});
	} catch (error) {
		yield put({type: types.GET_TICKETS_ERROR, error});
	}
}