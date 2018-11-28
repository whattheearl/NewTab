/* global chrome */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFavorite, toggleWorkspaceModal, removeWorkspace } from '../../../actions';

// components
import Space from './index';

class SpaceContainer extends Component {
    constructor(props) {
        super(props);
        this.openAllLinks = this.openAllLinks.bind(this);
        this.selectWorkspace = this.selectWorkspace.bind(this);
        this.editWorkspace = this.editWorkspace.bind(this);
        this.removeWorkspace = this.removeWorkspace.bind(this);
    }

    openAllLinks = (e) => {
        console.log('open all links');
        e.preventDefault()
        e.stopPropagation()
        if (process && process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                {
                    type: 'OPEN_TABS',
                    tabs: this.props.workspace.sites
                }
            );
        } else {
            chrome.runtime.sendMessage(
                {
                    type: 'OPEN_TABS',
                    tabs: this.props.workspace.sites
                }
            );
        }
    }

    selectWorkspace(e) {
        e.stopPropagation();
        this.props.history.push(`Workspace/${this.props.workspace.uuid}`);
    }

    editWorkspace(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.history.push(`Workspace/${this.props.workspace.uuid}`);
        this.props.toggleWorkspaceModal();
    }

    removeWorkspace(e) {
        e.stopPropagation();
        this.props.removeWorkspace(this.props.workspace);
    }

    favoriteWorkspace = (e) => {
        e.stopPropagation();
        this.props.toggleFavorite(this.props.workspace);
    }

    render() {
        if (!this.props.workspace) return;
        return (
            <Space
                {...this.props.workspace}
                openAllLinks={this.openAllLinks}
                select={this.selectWorkspace}
                edit={this.editWorkspace}
                remove={this.removeWorkspace}
                favorite={this.favoriteWorkspace}
            />
        );
    }
}
export default connect(null, { toggleFavorite, toggleWorkspaceModal, removeWorkspace })(SpaceContainer);