/* global chrome */
import React, { Component }  from 'react'
import defaultWorkspaces from '../../data/workspaces'
import Workspace from './index'

class WorkspaceContainer extends Component {
    constructor(props) {
        super(props)
        const localWorkspaces = window.localStorage.getItem('workspace')
        const workspaces = localWorkspaces? JSON.parse(localWorkspaces) : defaultWorkspaces

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
        switch(action) {
            // adds a new workspace
            case 'ADD_WORKSPACE':
                // Only add if name is set
                let {name, sites} = payload
                // create new workspace and add to state
                this.setState(state => ({
                    workspaces: [
                        {
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
                chrome.runtime.sendMessage( chrome.extensionId, {type: "CLOSE_ALL_TABS"})
                return
            // handles current name state
            default:
                return
        }
    }

    render() {
        return (
            <Workspace
                workspaceHandler={this.workspaceHandler.bind(this)} 
                name={this.state.name} 
                workspaces={this.state.workspaces} 
            />
        )
    }
}

export default WorkspaceContainer