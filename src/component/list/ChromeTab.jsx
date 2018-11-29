/* global chrome */
// ChromeTabArea component displays currently opened tabs and allows you to:
// - contextually save tabs to your workspace
// - Focus tabs
// - Close tabs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import ChromeTab from '../listItem/ChromeTab';
import VerticalScrollArea from '../container/VerticalScroll';

// Styled
import colors from '../../styles/colors';

class ChromeTabArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chromeTabs: [],
            lastActivity: Date.now()
        }
        this.selectTab = this.selectTab.bind(this);
    }

    // Update Tabs in development environment
    // TODO rewrite this to recieve message direct from background script
    handleEvent(event) {
        if (process.env.NODE_ENV === 'production') return
        // We only accept messages from ourselves
        if (event.source !== window)
            return
        if (event.data.type && (event.data.type === "UPDATE_CHROMETABS")) {
            this.setState({ chromeTabs: event.data.chromeTabs })
        }
    }

    // Updates Tabs in production
    chromeTabHandler(request, sender, sendResponse) {
        switch (request.type) {
            case 'UPDATE_TABS':
                this.setState({ chromeTabs: request.tabs })
                return
            default:
                return
        }
    }

    // add event handler to listen for tab updates from background script
    componentDidMount() {
        if (process.env.NODE_ENV === 'development') {
            window.addEventListener('message', this.handleEvent.bind(this))
        } else {
            chrome.runtime.onMessage.addListener(this.chromeTabHandler.bind(this))
        }
    }

    // remove listener
    componentWillUnmount() {
        if (process.env.NODE_ENV === 'development') {
            window.removeEventListener('message', this.handleEvent.bind(this))
        } else {
            chrome.runtime.onMessage.removeListener(this.chromeTabHandler)
        }
    }

    // Tells chrome to focus tab in browser
    selectTab(tab) {
        chrome.runtime.sendMessage(chrome.extensionId, { type: 'FOCUS_TAB', tab })
    }

    // Create Tiles for tab display
    renderTiles() {
        return this.state.chromeTabs.map(tab => {
            return <ChromeTab
                key={tab.id}
                tab={tab}
                name={tab.title}
                image={tab.favIconUrl}
                select={this.selectTab}
            />
        })
    }

    // format date
    renderLastActivity() {
        let d = new Date(this.state.lastActivity)
        let h = d.getHours()
        let timeOfDay = 'AM'
        if (h > 12) {
            h -= 12
            timeOfDay = 'PM'
        }
        return (
            <div>{`Session start: ${h}:${d.getMinutes()}${timeOfDay}`}</div>
        )
    }

    render() {
        return (
            <Container>
                <AreaTitle>Tabs</AreaTitle>
                <VerticalScrollArea>
                    {this.renderTiles()}
                    <LastActivity>
                        <Row>
                            <div>{`${this.state.chromeTabs.length} Tabs`}</div>
                            {this.renderLastActivity()}
                        </Row>
                    </LastActivity>
                </VerticalScrollArea>
            </Container>

        )
    }
}
export default ChromeTabArea;

// Styled Components
const Container = styled.div`
    box-sizing: border-box;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const AreaTitle = styled.h1`
    font-size: 1.25rem;
    color: ${colors.black};
    margin-bottom: .25rem;
    box-sizing: border-box;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const LastActivity = styled.div`
    color: ${colors.gray};
    box-sizing: border-box;
`