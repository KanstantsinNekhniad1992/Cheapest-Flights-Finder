'use strict';

import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import TicketsRenderer from '../components/TicketsRenderer/TicketsRenderer';

describe('TicketsRenderer component', function () {

    let _wrapper;
    let props;

    beforeEach(function () {
        props = {
            tickets: {
                firstRoute: [
                    {
                        dateFrom: '2014-12-11T19:46:54.511Z',
                        dateTo: '2015-01-09T02:44:08.128Z',
                        currency: '$',
                        price: 250
                    },
                    {
                        dateFrom: '2014-12-11T14:21:39.000Z',
                        dateTo: '2015-01-14T09:14:56.205Z',
                        currency: '$',
                        price: 20
                    },
                    {
                        dateFrom: '2015-01-21T04:00:16.511Z',
                        dateTo: '2015-01-28T19:08:52.290Z',
                        currency: '$',
                        price: 100
                    }
                ],
                secondRoute: [
                    {
                        dateFrom: '2014-12-21T17:01:10.612Z',
                        dateTo: '2014-12-27T17:01:10.612Z',
                        currency: '$',
                        price: 50
                    },
                    {
                        dateFrom: '2015-01-21T04:00:16.511Z',
                        dateTo: '2015-02-21T04:00:16.511Z',
                        currency: '$',
                        price: 20
                    },
                    {
                        dateFrom: '2015-06-21T04:00:16.511Z',
                        dateTo: '2015-06-24T04:00:16.511Z',
                        currency: '$',
                        price: 110
                    }
                ]
            }
        };
        _wrapper = shallow(<TicketsRenderer {...props}/>)
    });

    it('should sort tickets ascending', function () {
        let props = _wrapper.instance().props;
        let sortedTickets = _wrapper.instance().sortTickets(props.tickets.secondRoute);
        expect(sortedTickets[0].price).toBe(20);
    });

    it('should generate tickets list', function () {
        let props = _wrapper.instance().props;
        let generatedList = _wrapper.instance().generateTicketsList({
            tickets: props.tickets.secondRoute,
            title: 'Arrivals'
        });
        expect(generatedList.props.className).toBe('tickets-list-holder__list');
    });

    it('should render generated tickets lists', function () {
        expect(_wrapper.find('.tickets-list').length).toBe(1);
    });

    it('should not throw error if props not exist', function () {
        let props = {
            tickets: {}
        };
        let _wrapper = shallow(<TicketsRenderer {...props}/>);
        expect(_wrapper.length).toEqual(1);
    });
});