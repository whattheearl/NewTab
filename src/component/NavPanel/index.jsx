import React, {Component} from 'react';
import styled from 'styled-components';

// Components
import Logo from './Logo';
import VerticalScrollArea from '../ContentContainers/VerticalScroll';
import Text from '../Text'

// Temp Data
import defaultPage from '../../data/speeddial';

// Styles
import colors from '../../styles/colors';

class NavPanel extends Component {
    clearCache() {
        console.log('clearing cache')
        window.localStorage.clear()
        window.location.reload()
    }

    loadTemplate() {
        window.localStorage.setItem('pages', JSON.stringify(defaultPage))
        window.location.reload()
    }

    // using workspaces as "pages" to sort work
    render() {
        if(!this.props.display) return null
        const displayTempArea = process.env.NODE_ENV === 'development'
        // sort by descending saved time
        let spaces = this.props.workspaces.slice().sort((a, b) => {return a.saved - b.saved})
            .map((space, index) => { 
                return <WorkspaceTile 
                    key={index} 
                    onClick={()=>{this.props.workspaceHandler('SELECT_WORKSPACE', {workspace: space})}}>
                    <Text text={space.name} maxLength={20} />
                </WorkspaceTile>});
        return (
            <Container>
                    <NavLogo>
                        <Logo/>
                    </NavLogo>
                    <VerticalScrollArea style={{height: '6.5rem'}}>
                        {spaces}
                        {displayTempArea? <div style={{marginTop: 'auto'}}>
                            <h1 style={{color: 'white', marginTop: 'auto'}}>Temp Area</h1>
                            <button onClick={this.clearCache} style={{padding: '.5rem'}}>Load Starter Data</button>
                            <button onClick={this.loadTemplate} style={{padding: '.5rem'}}>Load Empty Data</button></div>
                            : null }
                    </VerticalScrollArea>
            </Container>
        );
    }
}
export default NavPanel

const NavLogo = styled.div`
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.white};
`;

const Container = styled.div`
    padding: 2rem 1rem;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 256px;
    background-color: ${colors.darkBlue};
`;

const WorkspaceTile = styled.div`
    color: white;
    cursor: pointer;
    padding: 3px 0;
`;