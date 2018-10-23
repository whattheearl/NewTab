/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import TiledTab from './TabTile'
// import NewSiteModal from './NewSiteModal'

// Styled
import colors from '../../styles/colors'



class ChromeTabArea extends Component {
    constructor() {
        super()
        this.state = {
            chromeTabs: [],
            selectedTab: null,
            displayModal: true,
            lastActivity: Date.now()
        }
    }

    // handle plugin messages
    // TODO rewrite this to recieve message direct from background script
    handleEvent(event) {
        if(process.env.NODE_ENV === 'production') return
        // We only accept messages from ourselves
        if (event.source !== window)
            return
        if (event.data.type && (event.data.type === "UPDATE_CHROMETABS")) {
            this.setState({ chromeTabs: event.data.chromeTabs })
        }
    }

    chromeTabHandler(request, sender, sendResponse) {
        switch(request.type) {
            case 'UPDATE_TABS': 
                this.setState({chromeTabs: request.tabs})
                return
            default:
                return
        }
    }

    componentDidMount() {
        if(process.env.NODE_ENV === 'development') {
            window.addEventListener('message', this.handleEvent.bind(this))
        } else {
            chrome.runtime.onMessage.addListener(this.chromeTabHandler.bind(this))
        }
    }

    componentWillUnmount() {
        if(process.env.NODE_ENV === 'development') {
            window.removeEventListener('message', this.handleEvent.bind(this))
        } else {
            chrome.runtime.onMessage.removeListener(this.chromeTabHandler)
        }
    }

    selectTab(tab) {
        chrome.runtime.sendMessage(chrome.extensionId, {type: 'FOCUS_TAB', tab})
    }

    openNewSiteModal() {
        this.setState({ displayModal: true })
    }

    closeNewSiteModal() {
        this.setState({ displayModal: false })
    }

    renderTiles() {
        return this.state.chromeTabs.map(tab => {
            return <TiledTab
                key={tab.id}
                tab={tab}
                name={tab.title}
                image={tab.favIconUrl}
                openNewSiteModal={this.openNewSiteModal.bind(this)}
                select={this.selectTab.bind(this)}
                saveSite={this.props.saveSite}
            />
        })
    }

    renderLastActivity() {
        let d = new Date(this.state.lastActivity)
        let h = d.getHours()
        let timeOfDay = 'AM'
        if(h > 12) {
            h -= 12
            timeOfDay = 'PM'
        }
        return(
            <div>{`Session start: ${h}:${d.getMinutes()}${timeOfDay}`}</div>
        )
    }

    render() {
        return (
            <Container>
                {/* <NewSiteModal 
                    selectedSite={this.state.selectedTab}
                    displaySelf={this.state.displayModal}
                    closeModal={this.closeNewSiteModal.bind(this)}
                    saveSite={this.props.saveSite}
                /> */}
                <AreaTitle>Tabs</AreaTitle>
                {this.renderTiles()}
                <LastActivity>
                    <Row>
                        <div>{`${this.state.chromeTabs.length} Tabs`}</div>
                        {this.renderLastActivity()}
                    </Row>
                </LastActivity>
            </Container>
            
        )
    }
}
export default ChromeTabArea

const Container = styled.div`
    box-sizing: border-box;
    width: 300px;
    overflow-y: auto;
    padding: 2rem 1rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
`

const AreaTitle = styled.h1`
    font-size: 1.25rem;
    color: ${colors.gray};
    margin-bottom: .25rem;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const LastActivity = styled.div`
    margin-top: auto;
    color: ${colors.gray};
`