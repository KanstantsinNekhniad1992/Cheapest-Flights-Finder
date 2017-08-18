'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import {normalizeDate} from "../../services/dateService";
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
            searchRequestData: {
                oneWayTicket: false,
                from: '',
                to: '',
                arrivalDate: '',
                departureDate: '',
            },
            possibleAirports: []
        };

        this.onDatePickerFieldChanged = this.onDatePickerFieldChanged.bind(this);
        this.onFromFieldChanged = this.onFromFieldChanged.bind(this);
        this.toggleArrivalDateField = this.toggleArrivalDateField.bind(this);
        this.onFromFieldUpdated = this.onFromFieldUpdated.bind(this);
        this.onToFieldChanged = this.onToFieldChanged.bind(this);
        this.submitSearchForm = this.submitSearchForm.bind(this);
    }

    airportsFilter(searchText, key) {
        return key.toLowerCase().includes(searchText.toLowerCase());
    }

    onDatePickerFieldChanged(payload) {
        let searchRequestData = Object.assign({}, this.state.searchRequestData, payload);

        this.setState({
            searchRequestData: searchRequestData
        });
    }

    toggleArrivalDateField(e, inputChecked) {
        let searchRequestData = Object.assign({}, this.state.searchRequestData, {
            oneWayTicket: inputChecked
        });

        this.setState({
            searchRequestData: searchRequestData
        });
    }

    onFromFieldChanged(airport) {
        let result;
        let searchRequestData;

        if (!airport) {
            result = this.props.airportsNames;
        } else {
            let currentRoutes = this.props.routes[airport.code];

            result = this.props.airportsNames.reduce(function (prevValue, currentValue) {

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

    submitSearchForm(e) {
        e.preventDefault();

        this.props.submitHandler(this.state.searchRequestData);
    }

    render() {

        let {airportsNames} = this.props;

        return (
            <form onSubmit={this.submitSearchForm} className="flight-finder-form">
                <div>
                    <AutoComplete
                        name="from"
                        filter={this.airportsFilter}
                        floatingLabelText='From'
                        dataSource={airportsNames}
                        dataSourceConfig={{text: 'name', value: 'code'}}
                        onNewRequest={this.onFromFieldChanged}
                        style={styles.autoComplete}
                        onUpdateInput={this.onFromFieldUpdated}
                    />
                    <AutoComplete
                        name="to"
                        filter={this.airportsFilter}
                        floatingLabelText='To'
                        dataSource={(this.state.possibleAirports && this.state.possibleAirports.length) ? this.state.possibleAirports : airportsNames}
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
                        minDate={new Date()}
                        onChange={(eventData, date) => {
                            this.onDatePickerFieldChanged({departureDate: normalizeDate(date)})
                        }}
                    />
                    {!this.state.searchRequestData.oneWayTicket ? (
                        <DatePicker
                            name="arrivalDate"
                            hintText='Arrival date'
                            className="flight-finder-form_arrival-date-field"
                            container="inline"
                            minDate={new Date()}
                            onChange={(eventData, date) => {
                                this.onDatePickerFieldChanged({arrivalDate: normalizeDate(date)})
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
    airportsNames: PropTypes.arrayOf(PropTypes.object),
    routes: PropTypes.object,
    submitHandler: PropTypes.func
};

export default SearchForm;