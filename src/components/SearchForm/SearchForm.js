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
    }

    airportsFilter(searchText, key) {
        return key.toLowerCase().includes(searchText.toLowerCase());
    }

    render() {

        let {onFromFieldChanged, submitHandler, onToFieldChanged, toggleArrivalDateField, onDatePickerFieldChanged, airportsNames, oneWayTicket, possibleAirports, onFromFieldUpdated} = this.props;

        return (
            <form onSubmit={submitHandler} className="flight-finder-form">
                <div>
                    <AutoComplete
                        name="from"
                        filter={this.airportsFilter}
                        floatingLabelText='From'
                        dataSource={airportsNames}
                        dataSourceConfig={{text: 'name', value: 'code'}}
                        onNewRequest={onFromFieldChanged}
                        style={styles.autoComplete}
                        onUpdateInput={onFromFieldUpdated}
                    />
                    <AutoComplete
                        name="to"
                        filter={this.airportsFilter}
                        floatingLabelText='To'
                        dataSource={(possibleAirports && possibleAirports.length) ? possibleAirports : airportsNames}
                        dataSourceConfig={{text: 'name', value: 'code'}}
                        onNewRequest={onToFieldChanged}
                    />
                    <Toggle
                        label="One way ticket"
                        labelPosition='left'
                        style={styles.toggle}
                        onToggle={toggleArrivalDateField}
                    />
                    <DatePicker
                        name="departureDate"
                        className="flight-finder-form_departure-date-field"
                        hintText='Departure date'
                        container="inline"
                        minDate={new Date()}
                        onChange={(eventData, date) => {
                            onDatePickerFieldChanged({departureDate: normalizeDate(date)})
                        }}
                    />
                    {!oneWayTicket ? (
                        <DatePicker
                            name="arrivalDate"
                            hintText='Arrival date'
                            className="flight-finder-form_arrival-date-field"
                            container="inline"
                            minDate={new Date()}
                            onChange={(eventData, date) => {
                                onDatePickerFieldChanged({arrivalDate: normalizeDate(date)})
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
    onFromFieldChanged: PropTypes.func,
    onToFieldChanged: PropTypes.func,
    toggleArrivalDateField: PropTypes.func,
    onDatePickerFieldChanged: PropTypes.func,
    airportsNames: PropTypes.arrayOf(PropTypes.object),
    oneWayTicket: PropTypes.bool
};

export default SearchForm;