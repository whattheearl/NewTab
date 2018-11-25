/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectWorkspace, updateWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';
import bookmarkIcon from '../../assets/image/bookmark.png';

// Component
import Thumbnail from '../Thumbnail';

class TabTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            overlayVisibility: 'hidden',
        }
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
    }

    save(e) {
        e.stopPropagation()
        if (this.props.selectedWorkspace.sites.filter(site => site.url === this.props.tab.url).length >= 1) {
            return;
        }
        let workspace = {
            ...this.props.selectedWorkspace,
            sites: [
                ...this.props.selectedWorkspace.sites,
                this.props.tab,
            ]
        }
        this.props.updateWorkspace(workspace);
        this.props.selectWorkspace(workspace);
    }

    close(e) {
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

    onMouseEnter() {
        if (this.state.overlayVisibility === 'visible') return
        this.setState({ overlayVisibility: 'visible' })
    }

    onMouseLeave() {
        if (this.state.overlayVisibility === 'hidden') return
        this.setState({ overlayVisibility: 'hidden' })
    }

    onClick() {
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
                <CloseButton onClick={this.close}>X</CloseButton>
            </Overlay>
        )
    }

    render() {
        let { name, image } = this.props;
        return (
            <Row>
                <Container
                    onMouseOver={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onClick={this.onClick.bind(this)}
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

export default connect(mapStateToProps, { selectWorkspace, updateWorkspace })(TabTile);

const Row = styled.div`
    margin-bottom: 2px;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: .5rem;
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
    align-items: center;
    justify-content: space-between;
    display: flex;
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

const CloseButton = styled.button`
    margin-left: auto;
    padding: .5rem;
    border-radius: 4px;
    background-color: #000000AA;
    color: ${colors.white};
    cursor: pointer;
`

const ThumbnailContainer = styled.div`
    height: 25px;
    width: 25px;
`

const Title = styled.h1`
    margin-left: .75rem;
    max-height: 2rem;
    overflow: hidden;
`