/* global chrome */
import React, { Component } from 'react';

// Assets
import bookmark from '../../../image/bookmark.png';

// components
import Space from './index';
import Thumbnail from '../../Thumbnail';
import withHover from '../../../HOC/withHover'


class SpaceContainer extends Component {
    openAllLinks = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(process && process.env.NODE_ENV === 'development') {
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
            return (<a key={site.url} href={site.url} target="_blank" style={{display: 'block'}}>
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
        this.props.workspaceHandler('SELECT_WORKSPACE', {workspace: this.props.workspace});
    }

    removeWorkspace(e) {
        e.stopPropagation();
        this.props.workspaceHandler('REMOVE_WORKSPACE', {workspace: this.props.workspace});
    }

    favoriteWorkspace(e) {
        e.stopPropagation()
        const saved = this.props.workspace.saved? null : Date.now();
        const updatedWorkspace = { 
            ...this.props.workspace,
            saved,
        };
        this.props.workspaceHandler('REPLACE_WORKSPACE', {workspace: this.props.workspace, updatedWorkspace});
    }

    render() {
        return (
            <Space 
                {...this.props}
                sites={this.getSites()}
                openAllLinks={this.openAllLinks.bind(this)}
                select={this.selectWorkspace.bind(this)}
                remove={this.removeWorkspace.bind(this)}
                favorite={this.favoriteWorkspace.bind(this)}
            />
        );
    }
}
export default withHover(SpaceContainer);

// const Thumbnail = styled.img`
//     width: 25px;
//     height: 25px;
//     padding: 4px;
//     :hover {
//         background-color: ${color.white};
//     }
// `