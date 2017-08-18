'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './style.css';

const styles = {
    background: '#0000FF'
};

class Header extends React.Component {

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    render() {
        return (
            <AppBar
                className="header"
                style={styles}
                title="Raynair Flights Finder"
            />
        );
    }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Header;