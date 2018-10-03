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
        let {tabs} = props
        let selectedTab = tabs[0] ? tabs[0] : null

        this.state = {
            tabs: tabs,
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

    updateSelectedTab(updatedTab) {
        const tabIndex = this.state.tabs.indexOf(this.state.selectedTab)
        const tabs = [
          ...this.state.tabs.slice(0, tabIndex),
          updatedTab,
          ...this.state.tabs.slice(tabIndex + 1)
        ]
        this.props.updatePageTabs(tabs)
        this.setState({tabs, selectedTab: updatedTab})
    }

    updateSites(updatedSites){
        // create tab and update it in state
        this.updateSelectedTab({name: this.state.selectedTab.name, sites: updatedSites})
    }

    addTab(name) {
        const newTab = {
            name,
            sites: [],
        }
        const updatedTabs = [...this.state.tabs, newTab]
        this.props.updatePageTabs(updatedTabs)
        this.setState({tabs: updatedTabs, selectedTab: newTab})
    }

    // Render Link Tiles
    renderLinkPage() {
        if(!this.state.selectedTab) return null /*make alternate state request to create page*/
        return <LinkPage sites={this.state.selectedTab.sites} updateSites={this.updateSites.bind(this)}/>;
    }

    render() {
        console.log('Tabarea Render', this.state)
        if(this.props.tabs !== this.state.tabs) {
            this.setState({tabs: this.props.tabs, selectedTab: this.props.tabs[0] ? this.props.tabs[0] : null})
        }
        return(
            <Col>
                <TabNav
                    tabs={this.props.tabs}
                    selectTab={this.selectTab.bind(this)}
                    selectedTab={this.state.selectedTab}
                    toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}
                    addTab={this.addTab.bind(this)}
                />
                {this.renderLinkPage()}
            </Col>
        )
    } 
}

export default TabArea