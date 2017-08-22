'use strict';

import React from 'react';
import flightsReducer from '../reducers';
import expect from 'expect';
import * as types from '../actions/actionTypes';

describe('flights reducer', function () {

    const initialState = {
        flights: {}
    };

    it('should have initialState', function () {
        expect(flightsReducer()).toEqual({flights: initialState});
    });

    it('should not affect state', () => {
        expect(flightsReducer({}, {type: 'NOT_EXISTING'})).toEqual({flights: initialState});
    });

    it('should load all flights', function () {
        const flights = {foo: 'foo'};
        const action = {flights: flights, type: types.LOAD_ALL_FLIGHTS_SUCCESS};
        expect(flightsReducer(initialState, action)).toEqual({flights: flights});
    });

    it('should get all tickets', function () {
        const tickets = {foo: 'foo'};
        const action = {data: tickets, type: types.GET_TICKETS_SUCCESS};
        expect(flightsReducer(initialState, action)).toEqual({flights: {tickets: tickets}});
    });

});