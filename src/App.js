import React, { Component } from 'react'
import styled, {injectGlobal} from 'styled-components'

// Components
import NavPanel from './component/NavPanel'
import TabArea from './component/TabArea'

// Starter state
import defaultPage from './Pages/data'

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

class App extends Component {
  constructor(props) {
    super(props)
    let pages = JSON.parse(window.localStorage.getItem('pages')) || defaultPage
    let selectedPage = pages[0] ? pages[0] : null

    this.state = {
      displaySettingsPanel: false,
      displayNavPanel: true,
      pages,
      selectedPage,
    }
  }

  selectPage(page) {
    const index = this.state.pages.indexOf(page)
    const selectedPage = this.state.pages[index]
    const selectedTab = this.state.pages[index].tabs[0] || null;
    this.setState({selectedPage, selectedTab})
  }

  createPage(name) {
    return {name, tabs:[{name: 'Main', sites:[]}]}
  }

  addPage(name) {
    let newPage = this.createPage(name)
    let pages = [...this.state.pages, newPage]
    this.setState({pages, selectedPage: newPage})
    window.localStorage.setItem('pages', JSON.stringify(pages))
  }

  updatePageTabs(updatedTabs) {
    let updatedPage = {
      name: this.state.selectedPage.name,
      tabs: updatedTabs
    }
    this.updatePage(updatedPage)
  }

  updatePage(updatedPage) {
    const pageIndex = this.state.pages.indexOf(this.state.selectedPage)
    const updatedPages = [
      ...this.state.pages.slice(0, pageIndex),
      updatedPage,
      ...this.state.pages.slice(pageIndex + 1)
    ]
    this.setState({pages: updatedPages, selectedPage: updatedPage})
    window.localStorage.setItem('pages', JSON.stringify(updatedPages))
  }

  stringifyPages() {
    console.log(JSON.stringify(this.state.pages))
  }

  importPages(pages) {
    this.setState({pages})
  }  

  render() {
    console.log('APP RENDER', this.state)
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
          <TabArea 
            tabs={this.state.selectedPage.tabs}
            updatePageTabs={this.updatePageTabs.bind(this)}
          />
          {/* <SettingsPanel display={this.state.displaySettingsPanel}/>  */}
        </Row>
      </AppContainer>
    );
  }
}

export default App;
