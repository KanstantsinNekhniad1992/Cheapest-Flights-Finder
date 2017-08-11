'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

class AutoCompleteField extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {

        let {source, onInputChange, label = '', className = ''} = this.props;

        return (

        )

    }
}

AutoCompleteField.propTypes = {
    label: PropTypes.string
};

export default AutoCompleteField;