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
			airportsNames: [],
			oneWayTicket: false,
			possibleAirports: [],
			searchRequestData: {
				from: '',
				to: '',
				arrivalDate: '',
				departureDate: ''
			}
		};

		this.toggleArrivalDateField = this.toggleArrivalDateField.bind(this);
		this.onFromFieldChanged = this.onFromFieldChanged.bind(this);
		this.onToFieldChanged = this.onToFieldChanged.bind(this);
		this.onDatePickerFieldChanged = this.onDatePickerFieldChanged.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
        this.onFromFieldUpdated = this.onFromFieldUpdated.bind(this);
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

	toggleArrivalDateField(e, inputChecked) {
		this.setState({
			oneWayTicket: inputChecked
		});
	}

	onFromFieldChanged(airport) {
		let result;
		let searchRequestData;

		if (!airport) {
			result = this.state.airportsNames;
		} else {
			let currentRoutes = this.props.flights.routes[airport.code];

			result = this.state.airportsNames.reduce(function (prevValue, currentValue) {

				if (currentRoutes.indexOf(currentValue.code) > -1) {
					prevValue.push(currentValue)
				}

				return prevValue;

			}, []);
		}

		searchRequestData = Object.assign({}, this.state.searchRequestData, {from: airport ? airport.code : ''});

		this.setState({
			possibleAirports: result,
			searchRequestData: searchRequestData
		});
	}

    onFromFieldUpdated(searchText) {
        if (searchText.length === 0) {
            this.setState({
                possibleAirports: this.state.airportsNames
            });
        }
    }

	onToFieldChanged(airport) {
		let airportCode = airport ? airport.code : '';
		let searchRequestData = Object.assign({}, this.state.searchRequestData, {to: airportCode});

		this.setState({
			searchRequestData: searchRequestData
		});
	}

	onDatePickerFieldChanged(payload) {
		let searchRequestData = Object.assign({}, this.state.searchRequestData, payload);

		this.setState({
			searchRequestData: searchRequestData
		});
	}

	submitHandler(e) {
		e.preventDefault();

		this.props.actions.getTickets({
			from: this.state.searchRequestData.from,
			to: this.state.searchRequestData.to,
			departureDate: this.state.searchRequestData.departureDate,
			arrivalDate: this.state.searchRequestData.arrivalDate
		});
	}

	render() {

		let {tickets = []} = this.props.flights;

		return (
			<div>
				<SearchForm
					onFromFieldChanged={this.onFromFieldChanged}
					onToFieldChanged={this.onToFieldChanged}
					toggleArrivalDateField={this.toggleArrivalDateField}
					onDatePickerFieldChanged={this.onDatePickerFieldChanged}
					possibleAirports={this.state.possibleAirports}
					airportsNames={this.state.airportsNames}
					oneWayTicket={this.state.oneWayTicket}
					submitHandler={this.submitHandler}
					onFromFieldUpdated={this.onFromFieldUpdated}
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