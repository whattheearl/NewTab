import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import NavPanel from './component/NavPanel'
import MainHeader from './component/MainHeader'
import LinkArea from './component/LinkArea'
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySettingsPanel: false,
      displayNavPanel: true,
      linkAreaEditable: false,
    }
  }

  toggleSettingsPanel() {
    this.setState({
      displaySettingsPanel: !this.state.displaySettingsPanel
    })
  }

  render() {
    return (
      <AppContainer className="App">
        <Row>
          <NavPanel display={this.state.displayNavPanel && !this.state.displaySettingsPanel}/>
          <Col>
            <MainHeader toggleSettingsPanel={this.toggleSettingsPanel.bind(this)}/>
            <LinkArea/>
          </Col>
          <SettingsPanel display={this.state.displaySettingsPanel}/>
        </Row>
      </AppContainer>
    );
  }
}

export default App;
