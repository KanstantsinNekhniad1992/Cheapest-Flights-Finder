'use strict';

import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function (state = initialState, action = {}) {
	switch (action.type) {
		case types.LOAD_ALL_FLIGHTS_SUCCESS:
			console.dir({
                ...state, ...action.flights
            });
			return {
				...state, ...action.flights
			};
		case types.GET_TICKETS_SUCCESS:
			return {
				...state, tickets: action.data
			};
		default:
			return state;
	}
}