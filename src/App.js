import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import NavPanel from './component/NavPanel'
import MainHeader from './component/MainHeader'
import LinkPage from './component/LinkPage'
import SettingsPanel from './component/SettingsPanel'

// Styled
const AppContainer = styled.div`
  background-color: #f8f8f8;
`

const Row = styled.div`
  display: flex;
  min-height: 100vh;
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

    let selectedPage = pages[0] ? pages[0] : null

    this.state = {
      displaySettingsPanel: false,
      displayNavPanel: true,
      pages,
      selectedPage,
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
    this.setState({selectedPage: this.state.pages[index]})
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

  updatePage(updatedPage) {
    const index = this.state.pages.indexOf(this.state.selectedPage)
    const pages = this.copyPages(this.state.pages)
    pages.splice(index, 1, updatedPage)
    this.setState({pages, selectedPage: updatedPage})
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
    if(!this.state.selectedPage) return null /*make alternate state request to create page*/
    return <LinkPage page={this.state.selectedPage} updatePage={this.updatePage.bind(this)}/>;
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
          />
          <Col>
            <button style={{padding: '2rem'}}onClick={this.stringifyPages.bind(this)}>Test Export</button>
            <button>Test Import</button>

            <MainHeader toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}/>
            {this.renderLinkPage()}
          </Col>
          <SettingsPanel display={this.state.displaySettingsPanel}/> 
        </Row>
      </AppContainer>
    );
  }
}

export default App;
