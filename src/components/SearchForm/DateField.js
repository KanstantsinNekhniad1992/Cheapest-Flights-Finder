'use strict';

import React from 'react';
import DatePicker from 'material-ui/DatePicker';

class DepartureDateField extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let {label = ''} = this.props;

        return (
            <DatePicker hintText={label} container="inline"/>
        )
    }

}

export default DepartureDateField;