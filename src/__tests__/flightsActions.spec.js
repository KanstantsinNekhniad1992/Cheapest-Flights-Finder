'use strict';

import React from 'react';
import expect from 'expect';
import * as types from '../actions/actionTypes';
import * as flightsActions from '../actions/flightsActions';

describe('flights actions', function () {

    describe('loadFlights should always return plain object with type: LOAD_ALL_FLIGHTS_REQUEST', function () {

        it('without parameters', function () {
            let result = flightsActions.loadFlights();
            expect(result).toEqual({
                type: types.LOAD_ALL_FLIGHTS_REQUEST
            });
        });

        it('with parameters', function () {
            let result = flightsActions.loadFlights({value: 'data'});
            expect(result).toEqual({
                type: types.LOAD_ALL_FLIGHTS_REQUEST
            });
        });

    });

    describe('getTickets should always return plain object with type: GET_TICKETS_REQUEST', function () {

        it('without parameters', function () {
            let result = flightsActions.getTickets();
            expect(result).toEqual({
                type: types.GET_TICKETS_REQUEST,
                payload: undefined
            });
        });

        it('with parameters', function () {
            let result = flightsActions.getTickets({value: 'data'});
            expect(result).toEqual({
                type: types.GET_TICKETS_REQUEST,
                payload: {value: 'data'}
            });
        });

    })

});