/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// Colors
import colors from './styles/colors'

// Components
import NavPanel from './component/NavPanel'
import NewPage from './Pages/New'

// Starter state
import defaultWorkspaces from './data/workspaces'

// ChromeExtension
chrome.extensionId = "defhcjlegcaebjcnomoegkhiaaiienpf"

const AppContainer = styled.div `
  background-color: ${colors.white};
`

const Row = styled.div `
  display: flex;
`

class App extends Component {
    constructor(props) {
        super(props)
        const localWorkspaces = window.localStorage.getItem('workspace')
        const workspaces = localWorkspaces ? JSON.parse(localWorkspaces) : defaultWorkspaces
        console.log('local', localWorkspaces)
        console.log(defaultWorkspaces)
        this.state = {
            workspaces,
            selectedWorkspace: null,
        }
    }

    exportWorkspace() {
        window.localStorage.setItem('workspace', JSON.stringify(this.state.workspaces))
    }

    // handler deals with state changes, ADD_WORKSPACE, REMOVE_WORKSPACE
    workspaceHandler(action, payload) {
        switch (action) {
            // adds a new workspace
            case 'ADD_WORKSPACE':
                // Only add if name is set
                let {
                    name,
                    sites
                } = payload
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
                }), this.exportWorkspace)
                // Close all tabs
                chrome.runtime.sendMessage(chrome.extensionId, {
                    type: "CLOSE_ALL_TABS"
                })
                return
            default:
                return
        }
    }


    render() {
        return ( 
            <div>
                <AppContainer className = "App" >
                    <Row>
                        <NavPanel 
                            display={ true } 
                            workspaces={ this.state.workspaces } 
                            workspaceHandler={this.workspaceHandler.bind(this)} 
                        /> 
                        <NewPage 
                            workspaces={this.state.workspaces} 
                            workspaceHandler={this.workspaceHandler.bind(this)} 
                        />
                    </Row> 
                </AppContainer> 
            </div>
        );
    }
}

export default App;