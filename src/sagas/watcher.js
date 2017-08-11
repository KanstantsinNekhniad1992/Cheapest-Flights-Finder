'use strict';

import {takeEvery} from 'redux-saga';
import loadAllFlights from './flightsSaga';
import * as types from '../actions/actionTypes';

export default function* watchFlights() {
    yield* takeEvery(types.LOAD_ALL_FLIGHTS_REQUEST, loadAllFlights);
}