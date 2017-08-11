'use strict';

import React from 'react';
import AutoCompleteField from './AutoCompleteField';

class OriginAirportField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {label, airportsNames, onInputChange} = this.props;

        return (
            <AutoCompleteField source={airportsNames} label={label} onInputChange={onInputChange}/>
        )
    }

}

export default OriginAirportField;