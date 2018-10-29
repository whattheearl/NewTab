/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// Styled
import colors from '../../styles/colors'


class TabTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            overlayVisibility: 'hidden',
        }
    }

    async save(e) {
        e.stopPropagation()
        try {
            let site = await this.getSite(this.props.tab)
            this.props.saveSite(site)
            chrome.runtime.sendMessage(
                chrome.extensionId, 
                {type: "CLOSE_TAB", tab: this.props.tab.id}
            )
        } catch(error) {
            console.log(error)
        }
    }

    close(e) {
        e.stopPropagation()
        if(process && process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                {type: "CLOSE_TAB", tab: this.props.tab.id}
            )
        } else {
            chrome.runtime.sendMessage(
                {type: "CLOSE_TAB", tab: this.props.tab.id}
            )
        }
    }

    getSite() {
        let {tab} = this.props
        if(!tab) return
        let site = {
            name: this.props.name,
            url: this.props.tab.url,
            image: this.props.image,
        }
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
                chrome.extensionId, 
                {
                    type: "GET_SITE",
                    to: tab.id,
                },
                response => {
                    site.icons = response && response.icons? response.icons : []
                    site.content = response && response.content? response.content : ""
                    if(site.icons && site.icons.length > 0) site.image = site.icons[0]
                    if(response) {
                        resolve(site);
                    } else {
                        reject('sendMessage Failure');
                    }
                }
            )
        })
    }

    onMouseEnter() {
        if(this.state.overlayVisibility === 'visible') return
        this.setState({overlayVisibility: 'visible'})
    }

    onMouseLeave() {
        if(this.state.overlayVisibility === 'hidden') return
        this.setState({overlayVisibility: 'hidden'}) 
    }

    onClick() {
        this.props.select(this.props.tab)
    }

    renderOverlay () {
        const shouldRender = !!this.props.openNewSiteModal
        if(!shouldRender) return null
        return (
            <Overlay style={{visibility: this.state.overlayVisibility}}>
                {/* <SaveButton onClick={this.save.bind(this)}>Save</SaveButton> */}
                {/* <SaveAsButton onClick={this.saveAs.bind(this)}>As</SaveAsButton> */}
                <CloseButton onClick={this.close.bind(this)}>X</CloseButton>
            </Overlay> 
        )
    }

    render() {
        let {name, image} = this.props
        return (
            <Row>
                <Container 
                    onMouseOver={this.onMouseEnter.bind(this)} 
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onClick={this.onClick.bind(this)}
                >
                    <ThumbnailContainer>
                        <Thumbnail 
                            src={image} 
                            alt={name} 
                            onError={(e) => {
                                e.target.onError = null
                                e.target.src=''
                            }}
                        />
                    </ThumbnailContainer>
                    <Title>{name}</Title>
                    {this.renderOverlay()}
                </Container>
            </Row>
        )
    }
}

export default TabTile

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
    justify-content: center;
    display: flex;
    visibility: hidden;
`

// Reworking this feature
// const SaveButton = styled.button`
//     padding: .5rem;
//     width: 35%;
//     border-radius: 4px;
//     background-color: #000000AA;
//     color: ${colors.white};
//     cursor: pointer;
//     margin-left: auto;
// `

// const SaveAsButton = styled.button`
//     padding: .5rem;
//     border-radius: 4px;
//     background-color: #000000AA;
//     color: ${colors.white};
//     cursor: pointer;
// `

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

const Thumbnail = styled.img`
    width: 25px;
    height: 25px;
`

const Title = styled.h1`
    margin-left: .75rem;
    max-height: 2rem;
    overflow: hidden;
`