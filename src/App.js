import React, { Component } from 'react'
import styled, {injectGlobal} from 'styled-components'

// Components
import NavPanel from './component/NavPanel'
import MainHeader from './component/MainHeader'
import LinkPage from './component/LinkPage'
import SettingsPanel from './component/SettingsPanel'

// temp data file (no backend yet)
import data from './data'

// Styled
injectGlobal`
  @import url("https://fonts.googleapis.com/css?family=Lobster");
`

const AppContainer = styled.div`
  background-color: #f8f8f8;
`

const Row = styled.div`
  display: flex;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
// Temp Code
let shortcut = {
  name: 'facebook',
  url: 'https://facebook.com',
  image: 'http://www.valuewalk.com/wp-content/uploads/2017/11/facebook_1509720559.png',
}

console.log(data)

class App extends Component {
  constructor(props) {
    super(props)
    let pages = [
      { 
        name: 'FirstPage', 
        sites: this.createSites() 
      },
      { 
        name: 'SecondPage', 
        sites: this.createSites() 
      }
    ]
    pages = data

    let selectedPage = pages[0] ? pages[0] : null
    console.log(selectedPage)
    let selectedTab = selectedPage.tabs[0] ? selectedPage.tabs[0] : null
    console.log(selectedTab)

    this.state = {
      displaySettingsPanel: false,
      displayNavPanel: true,
      pages,
      selectedPage,
      selectedTab,
    }
  }

  createSites() {
    let sites = []
    for(let i = 0; i < 8; i++) {
        let site = Object.assign({}, shortcut)
        site.name = site.name + i
        sites.push(site)
    }
    return sites
  }

  toggleSettingsPanel() {
    this.setState({
      displaySettingsPanel: !this.state.displaySettingsPanel
    })
  }

  selectPage(page) {
    const index = this.state.pages.indexOf(page)
    const selectedPage = this.state.pages[index]
    const selectedTab = this.state.pages[index].tabs[0] || null;
    console.log('selecting page', selectedPage)
    console.log('selecting tab', selectedTab)
    this.setState({selectedPage, selectedTab})
  }

  createPage(name) {
    return {name, sites: []}
  }

  addPage(name) {
    let pages = this.copyPages()
    let newPage = this.createPage(name)
    pages.push(newPage)
    this.setState({pages, selectedPage: newPage})
  }

  updateSites(updatedSites){
    // create tab and update it in state
    this.updateTab({name: this.state.selectedTab.name, sites: updatedSites})
  }

  updateTab(updatedTab) {
    // const index = this.state.pages.indexOf(this.state.selectedPage)
    // const pages = this.copyPages(this.state.pages)
    // pages.splice(index, 1, updatedPage)
    // this.setState({pages, selectedPage: updatedPage})
    debugger;
    const tabIndex = this.state.selectedPage.tabs.indexOf(this.state.selectedTab)
    console.log('selectedTab', this.state.selectedTab)
    const tabs = [
      ...this.state.selectedPage.tabs.slice(0, tabIndex),
      updatedTab,
      ...this.state.selectedPage.tabs.slice(tabIndex + 1)
    ]
    console.log('updatedTabs', tabs)
    this.setState({selectedTab: updatedTab})
    this.updatePage({
      name: this.state.selectedPage.name,
      tabs
    })
  }

  updatePage(updatedPage) {
    const pageIndex = this.state.pages.indexOf(this.state.selectedPage)
    console.log('selectedPages', this.state.pages)
    const updatedPages = [
      ...this.state.pages.slice(0, pageIndex),
      updatedPage,
      ...this.state.pages.slice(pageIndex + 1)
    ]
    console.log('updatedPages', updatedPages)
    this.setState({pages: updatedPages, selectedPage: updatedPage})
  }

  copyPages() {
    let copy = []
    this.state.pages.forEach(page => {
      copy.push(Object.assign({}, page))
    })
    return copy
  }

  // Render
  renderLinkPage() {
    if(!this.state.selectedTab) return null /*make alternate state request to create page*/
    return <LinkPage sites={this.state.selectedTab.sites} updateSites={this.updateSites.bind(this)}/>;
  }

  stringifyPages() {
    console.log(JSON.stringify(this.state.pages))
  }

  importPages(pages) {
    this.setState({pages})
  }  

  render() {
    return (
      <AppContainer className="App">
        <Row>
          <NavPanel 
            display={this.state.displayNavPanel && !this.state.displaySettingsPanel}
            pages={this.state.pages}
            selectPage={this.selectPage.bind(this)}
            addPage={this.addPage.bind(this)}
            selectedPage={this.state.selectedPage}
          />
          <Col>
            <MainHeader toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}/>
            {this.renderLinkPage()}
          </Col>
          {/* <SettingsPanel display={this.state.displaySettingsPanel}/>  */}
        </Row>
      </AppContainer>
    );
  }
}

export default App;
