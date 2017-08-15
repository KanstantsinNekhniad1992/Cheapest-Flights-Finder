'use strict';

import {fork} from 'redux-saga/effects';
import * as flightsWatcher from './watcher';
import 'regenerator-runtime/runtime';

export default function* root() {
	yield [
		fork(flightsWatcher.watchFlightsRequest),
		fork(flightsWatcher.watchTicketsRequest)
	];
}