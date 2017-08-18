'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as flightsActions from '../actions/flightsActions';
import TicketsRenderer from '../components/TicketsRenderer/TicketsRenderer';
import SearchForm from '../components/SearchForm/SearchForm';

class TicketsFinderContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			flights: {},
			airportsNames: []
		};

		this.submitHandler = this.submitHandler.bind(this);
	}

	componentDidMount() {
		this.props.actions.loadFlights();
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.flights.airports !== nextProps.flights.airports) {
			let airportsNames = this.getAirportsNamesList(nextProps.flights.airports);

			this.setState({
				airportsNames: airportsNames
			});
		}
	}

	getAirportsNamesList(airports) {

		if (!airports || !airports.length) {
			return [];
		}

		return airports.map(item => {
			return {
				name: item.name,
				code: item.iataCode
			};
		});
	}

	submitHandler(payload) {
		this.props.actions.getTickets(payload);
	}

	render() {

		let {tickets = {}, routes = {}} = this.props.flights;

		return (
			<div>
				<SearchForm
					airportsNames={this.state.airportsNames}
					routes={routes}
					submitHandler={this.submitHandler}
				/>
				<TicketsRenderer
					tickets={tickets}
				/>
			</div>
		)

	}
}

TicketsFinderContainer.propTypes = {
	flights: PropTypes.object
};

function mapStateToProps(state) {
	return {
		flights: state.flights
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(flightsActions, dispatch)
	};
}

export default connect(
	mapStateToProps, mapDispatchToProps)(TicketsFinderContainer);