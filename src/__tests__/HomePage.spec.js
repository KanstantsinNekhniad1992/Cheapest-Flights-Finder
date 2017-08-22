'use strict';

import React from 'react';
import expect from 'expect';
import HomePage from '../scenes/HomePage';
import {shallow} from 'enzyme';

describe('HomePage component', function () {

    const _wrapper = shallow(<HomePage/>);

    it('should render TicketsFinderContainer component', function () {
        expect(_wrapper.nodes.length).toEqual(1);
    })

});