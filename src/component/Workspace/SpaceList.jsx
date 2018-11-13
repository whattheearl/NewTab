import React, { Component } from 'react';
import styled from 'styled-components';

// colors
import colors from '../../styles/colors';

// Components
import Space from '../Tiles/Space/Container';
import VerticalScrollArea from '../ContentContainers/VerticalScroll';


class SpaceList extends Component {
    render() {
        const { workspaces, display } = this.props;
        if(!workspaces || !display) return null;
        const spaces = workspaces.slice()
            .sort((a, b) => { return b.lastModified - a.lastModified })
            .map((space, index) =>
                (<Space
                    key={index}
                    workspace={space} 
                    workspaceHandler={this.props.workspaceHandler} 
                    {...space} 
                />)
            )
        return (
            <Container>

                <VerticalScrollArea>
                    {spaces}
                </VerticalScrollArea>
                <InfoContainer>{`${spaces.length.toString()} workspaces created`}</InfoContainer>
            </Container>
        )
    }
}
export default SpaceList

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-bottom: 1px solid ${colors.darkWhite};
    box-sizing: border-box;
`

const InfoContainer = styled.div`
    margin-bottom: auto;
    text-align: center;
`