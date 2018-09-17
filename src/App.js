import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import LinkTile from './component/pure/LinkTile'
import PlusButton from './component/pure/PlusButton'
import NavPanel from './component/NavPanel'
import MainHeader from './component/MainHeader'
import NewSiteModal from './component/NewSiteModal'

// Styles
const AppContainer = styled.div`
  background-color: #f8f8f8;
`

const TileGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  margin: 0 auto;
  justify-content: space-evenly;
  position: relative;
`

const Tile = styled.div`
  width: 150px;
  height: 150px;
  margin: 25px;
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
  alt: 'facebook',
  uri: 'https://facebook.com',
  image: 'http://www.valuewalk.com/wp-content/uploads/2017/11/facebook_1509720559.png',
}

let sites = []
for(let i = 0; i < 8; i++) {
  sites.push(<Tile key={`${i}`}><LinkTile  alt={shortcut.alt} uri={shortcut.uri} image={shortcut.image} /></Tile>)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayModal: false,
      sites
    }
  }

  openModal() {
    console.log('addnewsite button clicked')
    this.setState({displayModal: true})
  }

  closeModal() {
    console.log('close modal clicked')
    this.setState({displayModal: false})
  }

  addSite(url, name, image) {
    console.log(url, name, image)
    this.closeModal()
    console.log(this)
  }

  render() {
    return (
      <AppContainer className="App">
        <NewSiteModal 
            displaySelf={this.state.displayModal} 
            closeModal={this.closeModal.bind(this)}
            saveSite={this.addSite.bind(this)} />
        <Row>
          <NavPanel />
          <Col>
            <MainHeader/>
            <TileGrid>
              {sites}
            </TileGrid>
            <PlusButton onClick={this.openModal.bind(this)}></PlusButton>
          </Col>
        </Row>
      </AppContainer>
    );
  }
}

export default App;
