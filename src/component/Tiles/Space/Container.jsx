/* global chrome */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleWorkspaceModal } from '../../../actions/toggleWorkspaceModal';

// Assets
import bookmark from '../../../assets/image/bookmark.png';

// components
import Space from './index';
import Thumbnail from '../../Thumbnail';

class SpaceContainer extends Component {
    constructor(props) {
        super(props);
        this.openAllLinks = this.openAllLinks.bind(this);
        this.selectWorkspace = this.selectWorkspace.bind(this);
        this.removeWorkspace = this.removeWorkspace.bind(this);
        this.favoriteWorkspace = this.favoriteWorkspace.bind(this);
        this.renameWorkspace = this.renameWorkspace.bind(this);
    }

    openAllLinks = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (process && process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                {
                    type: 'OPEN_TABS',
                    tabs: this.props.sites
                }
            );
        } else {
            chrome.runtime.sendMessage(
                {
                    type: 'OPEN_TABS',
                    tabs: this.props.sites
                }
            );
        }
    }

    getSites() {
        return this.props.sites.map((site) => {
            let image = site.image || site.favIconUrl
            return (<a key={site.url} href={site.url} target="_blank" style={{ display: 'block' }}>
                <Thumbnail
                    image={image}
                    backupImage={bookmark}
                    alt={image}
                    width={'25px'}
                    height={'25px'}
                    padding={'0 4px'}
                />
            </a>);
        })
    }

    selectWorkspace(e) {
        e.stopPropagation();
        this.props.workspaceHandler('SELECT_WORKSPACE', this.props.workspace);
        console.log(this.props.toggleWorkspaceModal);
        this.props.toggleWorkspaceModal();
    }

    removeWorkspace(e) {
        e.stopPropagation();
        this.props.workspaceHandler('REMOVE_WORKSPACE', { workspace: this.props.workspace });
    }

    favoriteWorkspace(e) {
        e.stopPropagation()
        const saved = this.props.workspace.saved ? null : Date.now();
        const updatedWorkspace = {
            ...this.props.workspace,
            saved,
        };
        this.props.workspaceHandler('REPLACE_WORKSPACE', { workspace: this.props.workspace, updatedWorkspace });
    }

    renameWorkspace(e, name) {
        e.preventDefault();
        e.stopPropagation();
        const payload = {
            workspace: this.props.workspace,
            updatedWorkspace: {
                ...this.props.workspace,
                name: 'bob1',
            }
        }
        this.props.workspaceHandler('REPLACE_WORKSPACE', payload);
    }

    render() {
        return (
            <Space
                {...this.props}
                sites={this.getSites()}
                openAllLinks={this.openAllLinks}
                edit={this.selectWorkspace}
                remove={this.removeWorkspace}
                favorite={this.favoriteWorkspace}
                rename={this.renameWorkspace}
            />
        );
    }
}
export default connect(null, { toggleWorkspaceModal })(SpaceContainer);