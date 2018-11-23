/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import colors from './styles/colors';

// Components
import Page from './Pages/Home';

// Redux
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
const store = createStore(rootReducer);

// ChromeExtension ID, need it for communication while developing
chrome.extensionId = "fpebadocnijkabapochompcgjedcbgno";

class App extends Component {
    // Store changes to local storage
    exportWorkspace() {
        window.localStorage.setItem('workspace', JSON.stringify(this.state.workspaces));
    }

    render() {
        return (<div>
            <Provider store={store}>
                <AppContainer className={"App"}>
                    <Page />
                </AppContainer>
            </Provider>
        </div>);
    }
}
export default App;

// Styles
const AppContainer = styled.div`
    color: ${colors.black};
    margin: 0 auto;
    max-width: 1980px;
    height: 100vh;
`;