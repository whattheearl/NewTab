import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import TabNav from './TabNav'
import LinkPage from './SiteArea'
import BreadCrumbNav from './BreadcrumbNav'

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

    removeTab(e, tabIndex) {
        e.stopPropagation()
        const updatedTabs = [
            ...this.state.tabs.slice(0, tabIndex),
            ...this.state.tabs.slice(tabIndex + 1)
        ]
        // select the tab in the same position or if it doesnt exist the one before it
        let selectedTab
        if(updatedTabs.length === 0) {
            selectedTab = null
        } else if (tabIndex === updatedTabs.length) {
            selectedTab = updatedTabs[updatedTabs.length - 1]
        } else {
            selectedTab = updatedTabs[tabIndex]
        }
        this.props.updatePageTabs(updatedTabs)
        this.setState({tabs: updatedTabs, selectedTab})
    }

    // Render Link Tiles
    renderLinkPage() {
        if(!this.state.selectedTab) return null /*make alternate state request to create page*/
        return <LinkPage sites={this.state.selectedTab.sites} updateSites={this.updateSites.bind(this)}/>;
    }

    componentDidUpdate() {
        if(this.props.tabs !== this.state.tabs) {
            this.setState((state, props) => ({tabs: props.tabs, selectedTab: props.tabs[0] ? props.tabs[0] : null}))
        }
    }

    render() {
        return(
            <Col>
                <BreadCrumbNav page={this.props.page}/>
                <TabNav
                    tabs={this.props.tabs}
                    selectTab={this.selectTab.bind(this)}
                    selectedTab={this.state.selectedTab}
                    toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}
                    addTab={this.addTab.bind(this)}
                    removeTab={this.removeTab.bind(this)}
                />
                {this.renderLinkPage()}
            </Col>
        )
    } 
}
export default TabArea