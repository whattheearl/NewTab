import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import color from '../../styles/colors';

// Displays heading for the spacelist
class SpaceHeader extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <WorkspaceHeading onClick={() => {this.props.sortHandler({type: 'SELECT_NAME'})}}>Workspace Title</WorkspaceHeading>
                    <SitesHeading>Sites</SitesHeading>
                    <CreatedAtHeading onClick={() => {this.props.sortHandler({type: 'SELECT_CREATED'})}}>Created At</CreatedAtHeading>
                </Row>
            </Container>
        )
    }
}
export default SpaceHeader

const Container = styled.div`
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border-bottom: 1px solid ${color.darkWhite};
`

const Row = styled.div`
    width: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`

// margin-left: icon 40px + 1rem padding
const WorkspaceHeading = styled.div`
    margin-left: calc(40px + 1rem); 
    cursor: pointer;
`;

// max width of workspace 346px 8 padding
const SitesHeading = styled.div`
    width: calc(346px - 8px - 4px);
    margin-left: auto;
`;

// margin-right: 1rem padding + 7px for scrollbar
const CreatedAtHeading = styled.div`
    width: 5rem;
    margin-right: calc(1rem + 7px); 
    cursor: pointer;
`;