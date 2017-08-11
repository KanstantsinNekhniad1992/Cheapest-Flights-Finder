'use strict';

import React from 'react';
import Header from '../components/Header/Header';
import HomePage from '../scenes/HomePage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component {

    render() {

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
                <div>
                    <Header/>
                    <HomePage/>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default App;