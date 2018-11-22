/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

// Assets
import colors from './styles/colors';
import defaultWorkspaces from './assets/data/ws'; // Sample user state

// Components
import Page from './Pages/Home';

// Redux
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
const store = createStore(rootReducer);
console.log(store.getState());

// ChromeExtension ID, need it for communication while developing
chrome.extensionId = "defhcjlegcaebjcnomoegkhiaaiienpf";

class App extends Component {
    constructor(props) {
        super(props);
        const localWorkspaces = window.localStorage.getItem('workspace');
        let workspaces = localWorkspaces ? JSON.parse(localWorkspaces) : defaultWorkspaces;
        workspaces = this.ensureUUID(workspaces);
        this.state = {
            workspaces,
            selectedWorkspace: null,
        };
        this.workspaceHandler = this.workspaceHandler.bind(this);
    }

    ensureUUID(workspaces) {
        let missingUUID = workspaces.filter(space => !space.uuid);
        let complete = workspaces.filter(space => !!space.uuid);
        missingUUID.forEach(space => {
            space.uuid = this.getUUID(complete);
            complete.push(space);
        });
        return complete;
    }

    // Store changes to local storage
    exportWorkspace() {
        window.localStorage.setItem('workspace', JSON.stringify(this.state.workspaces));
    }

    getUUID(workspaces) {
        let uuid = uuidv1();
        // regenerate uuid if already used
        while (workspaces.filter(space => !!space.uuid && space.uuid === uuid).length > 0) {
            uuid = uuidv1();
        }
        return uuid;
    }

    // handler deals with state changes, ADD_WORKSPACE, REMOVE_WORKSPACE
    workspaceHandler(action, payload) {
        switch (action) {
            // adds a new workspace
            case 'ADD_WORKSPACE':
                // Only add if name is set
                const uuid = this.getUUID(this.state.workspaces)
                let {
                    name,
                    sites,
                } = payload;
                // create new workspace and add to state
                this.setState(state => ({
                    workspaces: [{
                        created: Date.now(),
                        lastModified: Date.now(),
                        name,
                        sites,
                        uuid,
                    },
                    ...state.workspaces,
                    ]
                }), this.exportWorkspace);
                return;
            case 'SELECT_WORKSPACE':
                throw new Error('BOOM!');
                if (payload.workspace !== undefined) {
                    this.setState({
                        selectedWorkspace: payload.workspace
                    });
                    return;
                }
                let target = this.state.workspaces.filter(space => String(space.uuid) === String(payload.uuid));
                if (target.length === 1) {
                    this.setState({
                        selectedWorkspace: target[0]
                    });
                } else {
                    console.error('Workspaces with same id', target);
                }
                return;
            // probably dont want workspace logic and workspaces logic in the same handler
            case 'REMOVE_WORKSPACE':
                // remove target workspace
                const {
                    workspace
                } = payload;
                const index = this.state.workspaces.indexOf(workspace);
                this.setState(state => ({
                    workspaces: [
                        ...state.workspaces.slice(0, index),
                        ...state.workspaces.slice(index + 1)
                    ],
                    selectedWorkspace: state.selectedWorkspace
                }), this.exportWorkspace);
                return;
            case 'REPLACE_WORKSPACE':
                const {
                    workspace: prevWorkspace,
                    updatedWorkspace
                } = payload;
                const indexToBeReplaced = this.state.workspaces.indexOf(prevWorkspace);
                // reset the current workspace as selected if already selected
                const selected = prevWorkspace === this.state.selectedWorkspace ? updatedWorkspace : null;
                this.setState(state => ({
                    workspaces: [
                        ...state.workspaces.slice(0, indexToBeReplaced),
                        updatedWorkspace,
                        ...state.workspaces.slice(indexToBeReplaced + 1)
                    ],
                    selectedWorkspace: selected
                }), this.exportWorkspace);
                return;
            default:
                return;
        }
    }

    render() {
        return (<div>
            <Provider store={store}>
                <AppContainer className={"App"}>
                    {/* <Page
                    // workspaces={this.state.workspaces}
                    // selectedWorkspace={this.state.selectedWorkspace}
                    // workspaceHandler={this.workspaceHandler}
                    /> */}
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