import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import TabNav from './TabNav'
import LinkPage from './SiteArea'

// Styled
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

class TabArea extends Component {
    constructor(props) {
        super(props)
        let {page} = props
        let selectedTab = page.tabs[0] ? page.tabs[0] : null

        this.state = {
            tabs: page.tabs,
            selectedTab
        }
    }

    selectTab(tab) {
        this.setState({selectedTab: tab})
    }

    toggleSettingsPanel() {
        this.setState({
          displaySettingsPanel: !this.state.displaySettingsPanel
        })
    }

    updateTab(updatedTab) {
        const tabIndex = this.state.tabs.indexOf(this.state.selectedTab)
        console.log('selectedTab', this.state.selectedTab)
        const tabs = [
          ...this.state.tabs.slice(0, tabIndex),
          updatedTab,
          ...this.state.tabs.slice(tabIndex + 1)
        ]
        console.log('updatedTabs', tabs)
        this.setState({selectedTab: updatedTab})
        this.props.updatePageTabs(tabs)
    }

    updateSites(updatedSites){
        // create tab and update it in state
        this.updateTab({name: this.state.selectedTab.name, sites: updatedSites})
    }

    // Render Link Tiles
    renderLinkPage() {
        if(!this.state.selectedTab) return null /*make alternate state request to create page*/
        return <LinkPage sites={this.state.selectedTab.sites} updateSites={this.updateSites.bind(this)}/>;
    }

    render() {
        if(this.props.page.tabs !== this.state.tabs) {
            this.setState({tabs: this.props.page.tabs, selectedTab: this.props.page.tabs[0] ? this.props.page.tabs[0] : null})
        }
        return(
            <Col>
                <TabNav tabs={this.state.tabs} selectTab={this.selectTab.bind(this)} selectedTab={this.state.selectedTab} toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}/>
                {this.renderLinkPage()}
            </Col>
        )
    } 
}

export default TabArea