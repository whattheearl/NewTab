import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import Logo from './Logo'

// Temp Data
import defaultPage from '../../data/samplePage'

// Styles
import colors from '../../styles/colors'

const NavLogo = styled.div`
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.white};
`

class NavPanel extends Component {

    clearCache() {
        window.localStorage.clear()
        window.location.reload()
    }

    loadTemplate() {
        window.localStorage.setItem('pages', JSON.stringify(defaultPage))
        window.location.reload()
    }

    renderWorkspaces() {
    }

    // removed pages, keeping it simple for now
    render() {
        const {display} = this.props
        if(!display) return null

        return (
            <Container>
                <NavLogo>
                    <Logo/>
                </NavLogo>
                {this.props.workspaces.map((space, index) => {return <WorkspaceTile key={index} >{space.name}</WorkspaceTile>})}
                <h1 style={{color: 'white', marginTop: 'auto'}}>Temp Area</h1>
                <button onClick={this.clearCache} style={{padding: '.5rem'}}>Load Starter Data</button>
                <button onClick={this.loadTemplate} style={{padding: '.5rem'}}>Load Empty Data</button>
            </Container>
        )
    }
}
export default NavPanel

const Container = styled.div`
    padding: 2rem 1rem;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 256px;
    background-color: ${colors.darkBlue};
`

const WorkspaceTile = styled.div`
    color: white;
    cursor: pointer;
`