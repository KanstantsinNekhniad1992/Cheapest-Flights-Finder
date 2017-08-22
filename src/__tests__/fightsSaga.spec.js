'use strict';

import React from 'react';
import {loadAllFlights, getTickets} from '../sagas/flightsSaga';
import expect from 'expect';
import FlightsApi from '../api/flightsAPI';
import {put, call} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';

describe('flightsSaga', function () {

    const payload = {};
    const error = {};

    describe('loadAllFlights without error', function () {

        const loadAllFlightsIterator = loadAllFlights();
        const flights = {};

        it('should call FlightsApi.getAllFlights', function () {
            expect(loadAllFlightsIterator.next().value).toEqual(call(FlightsApi.getAllFlights))
        });

        it('should call LOAD_ALL_FLIGHTS_SUCCESS', function () {
            expect(loadAllFlightsIterator.next(flights).value).toEqual(put({
                type: types.LOAD_ALL_FLIGHTS_SUCCESS,
                flights
            }));
        });

    });

    describe('loadAllFlights with error', function () {

        const loadAllFlightsIteratorWithError = loadAllFlights();

        loadAllFlightsIteratorWithError.next();

        it('should call LOAD_ALL_FLIGHTS_ERROR', function () {
            expect(loadAllFlightsIteratorWithError.throw(error).value).toEqual(put({
                type: types.LOAD_ALL_FLIGHTS_ERROR,
                error
            }));
        });

    });

    describe('getTickets without error', function () {

        const getTicketsIterator = getTickets({payload});
        const data = {};

        it('should call FlightsApi.getTickets', function () {
            expect(getTicketsIterator.next().value).toEqual(call(FlightsApi.getTickets, payload))
        });

        it('should call GET_TICKETS_SUCCESS', function () {
            expect(getTicketsIterator.next(data).value).toEqual(put({
                type: types.GET_TICKETS_SUCCESS,
                data
            }));
        });

    });

    describe('loadAllFlights with error', function () {

        const getTicketsIteratorWithError = getTickets({payload});

        getTicketsIteratorWithError.next();

        it('should call LOAD_ALL_FLIGHTS_ERROR', function () {
            expect(getTicketsIteratorWithError.throw(error).value).toEqual(put({type: types.GET_TICKETS_ERROR, error}));
        });

    });

});