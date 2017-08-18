'use strict';

import expect from 'expect';
import React from 'react';
import {render} from 'enzyme';
import Header from '../components/Header/Header';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('Header component', function () {

    let _wrapper;
    const renderWithContext = (node) => render(node, {context: {muiTheme: getMuiTheme(baseTheme)}});

    beforeEach(function () {
        _wrapper = renderWithContext(<Header/>);
    });

    it('should render menu button', function () {
        expect(_wrapper.find('button').length).toBe(1);
    });

    it('should render h1 title', function () {
        expect(_wrapper.find('h1').length).toBe(1);
    });

    it('should render h1 with title "Raynair Flights Finder"', function () {
        expect(_wrapper.find('h1').text()).toBe('Raynair Flights Finder');
    });

});