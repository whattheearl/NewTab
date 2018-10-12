/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// Styled
import colors from '../../../../styles/colors'

const Row = styled.div`
    margin-bottom: .7rem;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    background-color: ${colors.darkWhite};
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: .5rem;
    box-sizing: border-box;
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

const SaveButton = styled.button`
    padding: .5rem 5rem;
    border-radius: 4px;
    background-color: #000000AA;
    color: ${colors.white};
    cursor: pointer;
`

const SaveAsButton = styled.button`
    padding: .5rem;
    border-radius: 4px;
    background-color: #000000AA;
    color: ${colors.white};
    cursor: pointer;
`

const CloseButton = styled.button`
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

 class TabTile extends Component {
    constructor() {
        super()
        this.state = {
            overlayVisibility: 'hidden',
        }
    }

    async save() {
        try {
            let site = await this.getSite(this.props.tab)
            this.props.saveSite(site)
        } catch(error) {
            console.log(error)
        }
    }

    async saveAs() {
        try {
            let site = await this.getSite(this.props.tab)
            this.props.select(site)
            this.props.openNewSiteModal()
        } catch(error) {
            console.log(error)
        }
    }

    close() {
        chrome.runtime.sendMessage(
            chrome.extensionId, 
            {type: "CLOSE_TAB", tab: this.props.tab.id}
        )
    }

    getSite() {
        let {tab} = this.props
        let site = {
            name: this.props.name,
            url: this.props.tab.url,
            image: this.props.image,
        }
        if(!tab) return
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

    render() {
        let {name, image} = this.props
        return (
            <Row>
                <Container 
                    onMouseOver={this.onMouseEnter.bind(this)} 
                    onMouseLeave={this.onMouseLeave.bind(this)}
                >
                    <ThumbnailContainer>
                        <Thumbnail src={image} alt={name}/>
                    </ThumbnailContainer>
                    <Title>{name}</Title>
                    <Overlay style={{visibility: this.state.overlayVisibility}}>
                        <SaveButton onClick={this.save.bind(this)}>Save</SaveButton>
                        <SaveAsButton onClick={this.saveAs.bind(this)}>As</SaveAsButton>
                        <CloseButton onClick={this.close.bind(this)}>X</CloseButton>
                    </Overlay>
                </Container>
            </Row>
        )
    }
}

export default TabTile