import React, {Component} from 'react';
import styled from 'styled-components';

// Assets
import defaultPage from '../../data/speeddial';
import colors from '../../styles/colors';

// Components
import VerticalScrollArea from '../ContentContainers/VerticalScroll';
import HomeButton from '../Buttons/Home';
import WorkspaceNavTile from '../Tiles/Nav'

class NavPanel extends Component {
    clickHomeButton = this.clickHomeButton.bind(this);

    clearCache() {
        console.log('clearing cache');
        window.localStorage.clear();
        window.location.reload();
    }

    loadTemplate() {
        window.localStorage.setItem('pages', JSON.stringify(defaultPage));
        window.location.reload();
    }

    // unselects current workspace
    clickHomeButton() {
        this.props.workspaceHandler('SELECT_WORKSPACE', {workspace: null});
    }

    // using workspaces as "pages" to sort work
    render() {
        if(!this.props.display) return null;
        const displayTempArea = process.env.NODE_ENV === 'development';
        // sort by descending saved time
        let spaces = this.props.workspaces.slice().sort((a, b) => {return a.saved - b.saved})
            .map((space, index) => { 
                return <WorkspaceNavTile 
                    key={index} 
                    onClick={()=>{this.props.workspaceHandler('SELECT_WORKSPACE', {workspace: space})}} 
                    name={space.name}
                    selected={this.props.selectedWorkspace === space}
                />;})

        
        return (
            <Container>
                <HomeButton 
                    display={true} 
                    onClick={this.clickHomeButton} 
                    selected={!this.props.selectedWorkspace}
                />
                <VerticalScrollArea>
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
export default NavPanel;

const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${colors.black};
`;