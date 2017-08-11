'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import './style.css';

const styles = {
    toggle: {
        marginBottom: 16,
        width: '180px'
    },
    autoComplete: {
        marginRight: '20px'
    }
};

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            from: '',
            to: '',
            departureDate: null,
            arrivalDate: null,
            possibleAirports: [],
            oneWayTicket: false,
            airportsNames: []
        };

        this.toggleArrivalDateField = this.toggleArrivalDateField.bind(this);
        this.onFromFieldChanged = this.onFromFieldChanged.bind(this);
        this.onToFieldChanged = this.onToFieldChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.airports !== nextProps) {
            let airportsNames = this.getAirportsNamesList(nextProps.airports);

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

    normalizeDate(date) {
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    }

    airportsFilter(searchText, key) {
        return key.toLowerCase().includes(searchText.toLowerCase());
    }

    onFromFieldChanged(airport) {
        let result;

        if (!airport) {
            result = this.state.airportsNames;
        } else {
            let currentRoutes = this.props.routes[airport.code];

            result = this.state.airportsNames.reduce(function (prevValue, currentValue) {

                if (currentRoutes.indexOf(currentValue.code) > -1) {
                    prevValue.push(currentValue)
                }

                return prevValue;

            }, []);
        }

        this.setState({
            possibleAirports: result,
            from: airport ? airport.code : ''
        });
    }

    onToFieldChanged(airport) {
        let airportCode = airport ? airport.code : '';

        this.setState({
            to: airportCode
        });
    }

    onDatePickerFieldChanged(payload) {
        this.setState({
            ...payload
        });
    }

    submitHandler() {

    }

    render() {

        return (
            <form className="flight-finder-form">
                <div>
                    <AutoComplete
                        name="from"
                        filter={this.airportsFilter}
                        floatingLabelText='From'
                        dataSource={this.state.airportsNames}
                        dataSourceConfig={{text: 'name', value: 'code'}}
                        onNewRequest={this.onFromFieldChanged}
                        style={styles.autoComplete}
                    />
                    <AutoComplete
                        name="to"
                        filter={this.airportsFilter}
                        floatingLabelText='To'
                        dataSource={(this.state.possibleAirports && this.state.possibleAirports.length) ? this.state.possibleAirports : this.state.airportsNames}
                        dataSourceConfig={{text: 'name', value: 'code'}}
                        onNewRequest={this.onToFieldChanged}
                    />
                    <Toggle
                        label="One way ticket"
                        labelPosition='left'
                        style={styles.toggle}
                        onToggle={this.toggleArrivalDateField}
                    />
                    <DatePicker
                        name="departureDate"
                        className="flight-finder-form_departure-date-field"
                        hintText='Departure date'
                        container="inline"
                        onChange={(eventData, date) => {
                            this.onDatePickerFieldChanged({departureDate: this.normalizeDate(date)})
                        }}
                    />
                    {!this.state.oneWayTicket ? (
                        <DatePicker
                            name="arrivalDate"
                            hintText='Arrival date'
                            className="flight-finder-form_arrival-date-field"
                            container="inline"
                            onChange={(eventData, date) => {
                                this.onDatePickerFieldChanged({arrivalDate: this.normalizeDate(date)})
                            }}
                        />
                    ) : false}
                </div>
                <button type="submit" className="flight-finder-form_find-flights-button"><i
                    className="material-icons md-48">search</i></button>
            </form>
        )
    }
}

SearchForm.propTypes = {
    onInputChange: PropTypes.func,
    airports: PropTypes.arrayOf(PropTypes.object),
    routes: PropTypes.object
};

export default SearchForm;