/* global chrome */
import React, { Component }  from 'react'
import defaultWorkspaces from '../../data/workspaces'
import Workspace from './index'

class WorkspaceContainer extends Component {
    constructor(props) {
        super(props)
        const localWorkspaces = window.localStorage.getItem('workspace')
        console.log(localWorkspaces)
        const workspaces = localWorkspaces? JSON.parse(localWorkspaces) : defaultWorkspaces

        this.state = {
            workspaces,
            name: '',
        }
        this.workspaceHandler.bind(this)
    }

    exportWorkspace() {
        window.localStorage.setItem('workspace', JSON.stringify(this.state.workspaces))
    }

    nameHandler(action, payload) {
        switch(action) {
            // sets workspace name (value is not used until saved)
            case 'SET_NAME': 
                this.setState({name: payload.name})
                return
            default:
                return
        }
            
    
    }
    // handler deals with state changes, ADD_WORKSPACE, REMOVE_WORKSPACE
    workspaceHandler(action, payload) {
        switch(action) {
            // adds a new workspace
            case 'ADD_WORKSPACE':
                // Only add if name is set
                if(this.state.name === '') {
                    this.nameInput.current.focus()
                    return
                }
                // create new workspace and add to state
                this.setState(state => ({
                    workspaces: [
                        {
                            id: state.workspaces.length,
                            name: this.state.name,
                            created: Date.now(),
                            lastModified: Date.now(),
                            sites: payload.sites
                        },
                        ...state.workspaces,
                    ]
                }), this.exportWorkspace)
                // Close all tabs
                chrome.runtime.sendMessage( chrome.extensionId, {type: "CLOSE_ALL_TABS"})
                this.setState({name: ''})
                return
            // handles current name state
            default:
                return
        }
    }

    render() {
        return (
            <Workspace 
                nameHandler={this.nameHandler.bind(this)}
                workspaceHandler={this.workspaceHandler.bind(this)} 
                name={this.state.name} 
                workspaces={this.state.workspaces} 
            />
        )
    }
}

export default WorkspaceContainer