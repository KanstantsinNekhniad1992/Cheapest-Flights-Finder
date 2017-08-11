'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as flightActions from '../actions/flightActions';
import SearchForm from '../components/SearchForm/SearchForm';
import ResultContainer from '../components/ResultContainer/ResultContainer';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            flights: {},
            cheapestFlights: []
        };
    }

    componentDidMount() {
        this.props.actions.loadFlights();
    }

    render() {
        let {airports, routes} = this.props.flights;

        return (
            <div>
                <SearchForm airports={airports} routes={routes}/>
                <ResultContainer/>
            </div>
        )
    }
}

HomePage.propTypes = {
    flights: PropTypes.object
};

function mapStateToProps(state) {
    return {
        flights: state.flights
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(flightActions, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps)(HomePage);