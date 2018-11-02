import React, { Component } from 'react'
import styled from 'styled-components'

// colors
import colors from '../../styles/colors'

// Components
import Space from '../Tiles/Space/Container'
import VerticalScrollArea from '../ContentContainers/VerticalScroll'

class SpaceList extends Component {
    render() {
        const { workspaces, display } = this.props;
        if(!workspaces || !display) return null;
        return (
            <Container>
                <VerticalScrollArea>
                    {workspaces.slice()
                        .sort((a, b) => { return b.lastModified - a.lastModified })
                        .map((space, index) =>
                            (<Space
                                key={index}
                                workspace={space} 
                                workspaceHandler={this.props.workspaceHandler} 
                                {...space} 
                            />)
                        )
                    }
                </VerticalScrollArea>
            </Container>
        )
    }
}
export default SpaceList

const Container = styled.div`
    display: flex;
    height: calc(100vh - 363.344px - 64px);
    width: 100%;
    background-color: white;
    border-top: 1px solid ${colors.darkWhite};
    border-bottom: 1px solid ${colors.darkWhite};
    box-sizing: border-box;
    /* end */
`