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
`;

const Row = styled.div `
    display: flex;
`;
 
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
    

    //******** removed auto save, it is extremely excessive for users who make new tabs often ********/
    // // Auto save current state on open (could check previously saved state and not save if it is the same)
    // componentDidMount() {
    //     // get curren open sites from backgroun script
    //     chrome.runtime.sendMessage(
    //         chrome.extensionId, 
    //         {type: 'GET_TABS'}, 
    //         (res) => {
    //             const {filtered: sites} = res;
    //             // Don't save if no sites open
    //             if(sites.length === 0) return;
    //             // save them as "Autosave localeStringDateTime"
    //             const date = new Date()
    //             this.workspaceHandler('ADD_WORKSPACE',{name: `AutoSave ${date.toLocaleString()}`, sites})
    //         }
    //     );
    // }

    render() {
        return (
            <div>
                <AppContainer className = "App" >
                    <Row>
                        <NavPanel 
                            display={ true } 
                            workspaces={ this.state.workspaces.filter(space => !!space.saved) } 
                            selectedWorkspace={ this.state.selectedWorkspace }
                            workspaceHandler={ this.workspaceHandler }
                        /> 
                        <NewPage 
                            workspaces={this.state.workspaces}
                            selectedWorkspace={ this.state.selectedWorkspace }
                            workspaceHandler={ this.workspaceHandler } 
                        />
                    </Row> 
                </AppContainer> 
            </div>
        );
    }
}

export default App;