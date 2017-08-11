'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './style.css';

class Header extends React.Component {

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    render() {
        return (
            <AppBar
                className="header"
                style={{background: '#0000FF'}}
                title="Raynair Flights Finder"
            />
        );
    }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Header;