import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import LinkTile from './component/pure/LinkTile'
import PlusButton from './component/pure/PlusButton'
import NavPanel from './component/NavPanel'

// Styles
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
`

// Temp Code
let shortcut = {
  alt: 'facebook',
  uri: 'https://facebook.com',
  image: 'http://www.valuewalk.com/wp-content/uploads/2017/11/facebook_1509720559.png',
}

let sites = []
for(let i = 0; i < 8; i++) {
  sites.push(<Tile><LinkTile key={`${i}`} alt={shortcut.alt} uri={shortcut.uri} image={shortcut.image} /></Tile>)
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Row>
            <NavPanel />
            <Col>
              <h1>I AM A HEADER</h1>
              <TileGrid>
                {sites}
                <PlusButton></PlusButton>
              </TileGrid>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;
