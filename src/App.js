/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import NavPanel from './component/NavPanel';
import NewPage from './Pages/New';

// Starter state
import defaultWorkspaces from './data/workspaces';

// ChromeExtension
chrome.extensionId = "defhcjlegcaebjcnomoegkhiaaiienpf";

const AppContainer = styled.div `
  background-color: white;
`

const Row = styled.div `
  display: flex;
`

class App extends Component {
    constructor(props) {
        super(props);
        const localWorkspaces = window.localStorage.getItem('workspace');
        const workspaces = localWorkspaces ? JSON.parse(localWorkspaces) : defaultWorkspaces;
        this.state = {
            workspaces,
            selectedWorkspace: null,
        }
    }

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
                // Close all tabs
                chrome.runtime.sendMessage(chrome.extensionId, {type: "CLOSE_ALL_TABS"});
                return;
            case 'SELECT_WORKSPACE':
                const { workspace: selectedWorkspace } = payload;
                this.setState({ selectedWorkspace });
                return;
            // probably dont want workspace logic and workspaces logic in the same handler
            case 'REMOVE_WORKSPACE':
                console.log('removing workspace in handler', action, payload)
                // remove target workspace
                const { workspace } = payload;
                const index = this.state.workspaces.indexOf(workspace);
                console.log(index)
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
                <AppContainer className = "App" >
                    <Row>
                        <NavPanel 
                            display={ true } 
                            workspaces={ this.state.workspaces.filter(space => !!space.saved) } 
                            selectedWorkspace={ this.state.selectedWorkspace }
                            workspaceHandler={ this.workspaceHandler.bind(this) }
                        /> 
                        <NewPage 
                            workspaces={this.state.workspaces}
                            selectedWorkspace={ this.state.selectedWorkspace }
                            workspaceHandler={ this.workspaceHandler.bind(this) } 
                        />
                    </Row> 
                </AppContainer> 
            </div>
        );
    }
}

export default App;