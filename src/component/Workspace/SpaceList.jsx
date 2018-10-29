import React, { Component } from 'react'
import styled from 'styled-components'

// colors
import colors from '../../styles/colors'

// Components
import Space from '../Tiles/Space/Container'

class SpaceList extends Component {
    render() {
        const { workspaces, display } = this.props
        if(!workspaces || !display) return null
        return (
            <Container>
                <SpaceContainer>
                    {workspaces.slice()
                        .sort((a, b) => { return b.lastModified - a.lastModified })
                        .map((space, index) => {
                            return <Space 
                                key={index} 
                                workspace={space} 
                                workspaceHandler={this.props.workspaceHandler} 
                                {...space} 
                            />
                    })}
                </SpaceContainer>
            </Container>
        )
    }
}
export default SpaceList

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 363.344px - 64px);
    width: 100%;
    box-sizing: border-box;
`

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    border-top: 1px solid ${colors.darkWhite};
    padding-bottom: .5rem;
    box-sizing: border-box;
    flex: 1;
`