/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';

// Assets
import colors from './styles/colors';
import defaultWorkspaces from './data/workspaces'; // New user state

// Components
import Home from './Pages/Home';

const AppContainer = styled.div `
    color: ${colors.black};
`;

const ICON_STYLES = {
    fontSize: '24px', 
    width: '24px', 
    height: '24px', 
    color: `${colors.lightGray}`,
};

const Row = styled.div `
    margin: 0 auto;
    max-width: 1980px;
    height: 100vh;
`;

// ChromeExtension ID, need it for communication while developing
chrome.extensionId = "defhcjlegcaebjcnomoegkhiaaiienpf";

class App extends Component {
    constructor(props) {
        super(props);
        const localWorkspaces = window.localStorage.getItem('workspace');
        const workspaces = localWorkspaces ? JSON.parse(localWorkspaces) : defaultWorkspaces;
        this.state = {
            workspaces,
            selectedWorkspace: null,
        };
        this.workspaceHandler = this.workspaceHandler.bind(this);
    }

    // Store changes to local storage
    exportWorkspace() {
        window.localStorage.setItem('workspace', JSON.stringify(this.state.workspaces));
    }

    // handler deals with state changes, ADD_WORKSPACE, REMOVE_WORKSPACE
    workspaceHandler(action, payload) {
        switch (action) {
            // adds a new workspace
            case 'ADD_WORKSPACE':
                // Only add if name is set
                let { name, sites } = payload;
                // create new workspace and add to state
                this.setState(state => ({
                    workspaces: [{
                            id: state.workspaces.length,
                            created: Date.now(),
                            lastModified: Date.now(),
                            name,
                            sites,
                        },
                        ...state.workspaces,
                    ]
                }), this.exportWorkspace);
                return;
            case 'SELECT_WORKSPACE':
                const { workspace: selectedWorkspace } = payload;
                this.setState({ selectedWorkspace });
                return;
            // probably dont want workspace logic and workspaces logic in the same handler
            case 'REMOVE_WORKSPACE':
                // remove target workspace
                const { workspace } = payload;
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
                const { workspace: prevWorkspace, updatedWorkspace } = payload;
                const indexToBeReplaced = this.state.workspaces.indexOf(prevWorkspace);
                const selected = prevWorkspace === this.state.selectedWorkspace? updatedWorkspace : null;
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
        return (
            <div>
                {/* <IconContext.Provider > */}
                    <AppContainer className = "App" >
                        <Row>
                            <Home 
                                workspaces={this.state.workspaces}
                                selectedWorkspace={ this.state.selectedWorkspace }
                                workspaceHandler={ this.workspaceHandler } 
                            />
                        </Row> 
                    </AppContainer> 
                {/* </IconContext.Provider> */}
            </div>
        );
    }
}

export default App;