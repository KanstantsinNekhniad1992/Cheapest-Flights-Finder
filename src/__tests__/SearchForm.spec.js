'use strict';

import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import SearchFrom from '../components/SearchForm/SearchForm';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

describe('Search Form component', function () {

    let _wrapper;
    const shallowWithContext = (node) => shallow(node, {context: {muiTheme: getMuiTheme(baseTheme)}});
    const props = {
        airportsNames: [],
        routes: {},
        submitHandler: expect.createSpy()
    };

    beforeEach(function () {
        _wrapper = shallowWithContext(<SearchFrom {...props}/>);
    });

    it('should render form', function () {
        expect(_wrapper.find('form').length).toBe(1);
    });

    it('should call submitHandler on submit', function () {
        _wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        });
        expect(props.submitHandler).toHaveBeenCalled();
    });

    it('should render 2 AutoComplete components', function () {
        expect(_wrapper.find(AutoComplete).length).toBe(2);
    });

    it('should render 2 DatePicker components', function () {
        expect(_wrapper.find(DatePicker).length).toBe(2);
    });

    it('should render Toggle component', function () {
        expect(_wrapper.find(Toggle).length).toBe(1);
    });

});