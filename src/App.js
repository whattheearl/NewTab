/* global chrome */
import React, { Component } from 'react'
// May not end up using custom Fonts
// import styled, {injectGlobal} from 'styled-components'
import styled from 'styled-components'

// Colors
import colors from './styles/colors'

// Components
import NavPanel from './component/NavPanel'
// import TabArea from './component/TabArea'
import NewPage from './Pages/New'

// Starter state
import data from './data/samplePage'
const {pages: defaultPage} = data

// Globla CSS Styled Components
// injectGlobal`
//   @import url("https://fonts.googleapis.com/css?family=Lobster");
// `

// ChromeExtension
chrome.extensionId = "defhcjlegcaebjcnomoegkhiaaiienpf"

const AppContainer = styled.div`
  background-color: ${colors.white};
`

const Row = styled.div`
  display: flex;
`

class App extends Component {
  constructor(props) {
    super(props)
    let pages = JSON.parse(window.localStorage.getItem('pages')) || defaultPage
    let selectedPage = null
    this.state = {
      displaySettingsPanel: false,
      displayNavPanel: true,
      pages,
      selectedPage
    }
  }
  exportData() {
    window.localStorage.setItem('pages', JSON.stringify(this.state.pages))
  }

  importData() {
  }  

  // selectPage(page) {
  //   const index = this.state.pages.indexOf(page)
  //   const selectedPage = this.state.pages[index]
  //   const selectedTab = this.state.pages[index].tabs[0] || null;
  //   this.setState({selectedPage, selectedTab})
  // }

  // createPage(name) {
  //   return {name, tabs:[{name: 'Main', sites:[]}]}
  // }

  // addPage(name) {
  //   let newPage = this.createPage(name)
  //   let pages = [...this.state.pages, newPage]
  //   this.setState({pages, selectedPage: newPage}, this.exportData())
  // }

  // updatePageTabs(updatedTabs) {
  //   let updatedPage = {
  //     name: this.state.selectedPage.name,
  //     tabs: updatedTabs
  //   }
  //   this.updatePage(updatedPage)
  // }

  // updatePage(updatedPage) {
  //   const pageIndex = this.state.pages.indexOf(this.state.selectedPage)
  //   const updatedPages = [
  //     ...this.state.pages.slice(0, pageIndex),
  //     updatedPage,
  //     ...this.state.pages.slice(pageIndex + 1)
  //   ]
  //   this.setState({pages: updatedPages, selectedPage: updatedPage}, this.exportData())
  // }

  // updateNewPage(updatedNewPage) {
  //   this.this.setState({newPage: updatedNewPage}, this.exportData())
  // }

  render() {
    // if(!this.state.pages) return null
    return (
        <div>
            <AppContainer className="App">
              <Row>
                <NavPanel 
                  display={true}
                  // pages={this.state.pages}
                  // selectPage={this.selectPage.bind(this)}
                  // addPage={this.addPage.bind(this)}
                  // selectedPage={this.state.selectedPage}
                />
                <NewPage />
                {/* <SettingsPanel display={this.state.displaySettingsPanel}/>  */}
              </Row>
            </AppContainer>
        </div>
    );
  }
}

export default App;
