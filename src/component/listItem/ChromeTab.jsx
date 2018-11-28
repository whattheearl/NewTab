/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectWorkspace, updateWorkspace, addSite } from '../../actions';
import uuid from 'uuid/v4';

// Assets
import colors from '../../styles/colors';
import bookmarkIcon from '../../assets/image/bookmark.png';

// Component
import Thumbnail from '../container/Image';
import CloseButton from '../button/Close';

class TabTile extends Component {
    // save site to currently selected workspace
    save = (e) => {
        e.stopPropagation()
        // Don't allow duplicates
        if (this.props.selectedWorkspace.sites.filter(site => site.url === this.props.tab.url).length >= 1) {
            return;
        }

        let site = {
            ...this.props.tab,
            uuid: uuid(),
            wsUuid: this.props.selectedWorkspace.uuid,
        }
        this.props.addSite(site);
    }

    // close tab in chrome
    close = (e) => {
        e.stopPropagation()
        if (process && process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                { type: "CLOSE_TAB", tab: this.props.tab.id }
            )
        } else {
            chrome.runtime.sendMessage(
                { type: "CLOSE_TAB", tab: this.props.tab.id }
            )
        }
    }

    getSite() {
        let { tab } = this.props
        if (!tab) return
        let site = {
            title: this.props.name,
            url: this.props.tab.url,
            favIconUrl: this.props.image,
        }
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                {
                    type: "GET_SITE",
                    to: tab.id,
                },
                response => {
                    site.icons = response && response.icons ? response.icons : []
                    site.content = response && response.content ? response.content : ""
                    if (site.icons && site.icons.length > 0) site.favIconUrl = site.icons[0]
                    if (response) {
                        resolve(site);
                    } else {
                        reject('sendMessage Failure');
                    }
                }
            )
        })
    }

    onClick = () => {
        this.props.select(this.props.tab)
    }

    renderOverlay() {
        return (
            <Overlay>
                <SaveButton
                    selectedWorkspace={!!this.props.selectedWorkspace}
                    onClick={this.save}>
                    Save
                </SaveButton>
                {/* <SaveAsButton onClick={this.saveAs.bind(this)}>As</SaveAsButton> */}
                <CloseButton
                    display={true}
                    onClick={this.close} />
            </Overlay>
        )
    }

    render() {
        let { name, image } = this.props;
        return (
            <Row>
                <Container
                    onClick={this.onClick}
                >
                    <ThumbnailContainer>
                        <Thumbnail
                            image={image}
                            alt={name}
                            width={'25px'}
                            height={'25px'}
                            backupImage={bookmarkIcon}
                        />
                    </ThumbnailContainer>
                    <Title>{name}</Title>
                    {this.renderOverlay()}
                </Container>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedWorkspace: state.selectedWorkspace
    };
}

export default connect(mapStateToProps, { addSite, selectWorkspace, updateWorkspace })(TabTile);

const Row = styled.div`
    margin-bottom: 2px;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: .33rem;
    box-sizing: border-box;
    cursor: pointer;
`

const Overlay = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: none;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    visibility: hidden;
    ${Row}:hover & {
        visibility: visible;
    }
`

const SaveButton = styled.button`
    padding: .5rem;
    width: 35%;
    border-radius: 4px;
    background-color: #000000AA;
    color: ${colors.white};
    cursor: pointer;
    ${Row}:hover & {
        visibility: ${props => props.selectedWorkspace ? 'visible' : 'hidden'};
    }
`

const ThumbnailContainer = styled.div`
    height: 25px;
    width: 25px;
`

const Title = styled.h1`
    margin-left: .75rem;
    font-size: .8rem;
    overflow: hidden;
    display: block; /* or inline-block */
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 2.3rem;
    line-height: 1.1rem;
`