/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// components
import Space from './index'

// styles
import color from '../../../styles/colors'

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
            )
        } else {
            chrome.runtime.sendMessage(
                {
                    type: 'OPEN_TABS',
                    tabs: this.props.sites
                }
            )
        }
    }

    getSites() {
        return this.props.sites.map((site, index) => {
            let src = site.image || site.favIconUrl
            return (<a key={index} href={site.url} target="_blank" style={{display: 'block'}}>
                <Thumbnail src={src} />
            </a>)
        })
    }

    render() {
        return (
            <Space 
                {...this.props}
                sites={this.getSites()}
                openAllLinks={this.openAllLinks.bind(this)} 
            />
        )
    }
}
export default SpaceContainer

const Thumbnail = styled.img`
    width: 25px;
    height: 25px;
    padding: 4px;
    :hover {
        background-color: ${color.white};
    }
`