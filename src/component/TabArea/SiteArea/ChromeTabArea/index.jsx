import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import TiledTab from './TabTile'
import NewSiteModal from './NewSiteModal'

// Styled
import colors from '../../../../styles/colors'

const Container = styled.div`
    width: 300px;
    height: calc(100vh - 56px - 32px);
    overflow-y: auto;
    padding: 0 1rem;
    box-sizing: border-box;
`

const AreaTitle = styled.h1`
    font-size: 1.25rem;
    color: ${colors.gray};
    margin-bottom: .25rem;
`

class ChromeTabArea extends Component {
    constructor(){
        super()
        this.state = {
            chromeTabs: [],
            selectedTab: null,
            displayModal: true,
        }
        this.extensionId = 'flceabcjbijkonhgckgflefpmegkkjig'
    }

    // handle plugin messages
    // TODO rewrite this to recieve message direct from background script
    handleEvent(event) {
        // We only accept messages from ourselves
        if (event.source !== window)
            return
        if (event.data.type && (event.data.type === "UPDATE_CHROMETABS")) {
            this.setState({chromeTabs: event.data.chromeTabs})
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.handleEvent.bind(this), false)
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleEvent)
    }

    selectTab(tab) {
        this.setState({selectedTab: tab})
    }

    openNewSiteModal() {
        this.setState({displayModal: true})
    }

    closeNewSiteModal() {
        this.setState({displayModal: false})
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

    render() {
        return (
            <Container>
                <NewSiteModal 
                    selectedSite={this.state.selectedTab} 
                    displaySelf={this.state.displayModal} 
                    closeModal={this.closeNewSiteModal.bind(this)}
                    saveSite={this.props.saveSite}
                />
                <AreaTitle>Tabs</AreaTitle>
                {this.renderTiles()}
            </Container>
        )
    }
}
export default ChromeTabArea
