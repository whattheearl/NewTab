/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// colors
import colors from '../../styles/colors'

// Components
import Space from '../Tiles/Space/Container'
import NameInput from './name.input'

class Workspace extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { workspaces } = this.props
        if(!workspaces) return null
        return (
            <Container>
                <NameInput workspaceHandler={this.props.workspaceHandler} />
                <SpaceContainer>
                    {workspaces.slice()
                        .sort((a, b) => { return b.lastModified - a.lastModified })
                        .map((space, index) => {
                            return <Space key={index} workspace={space} {...space} />
                    })}
                </SpaceContainer>
            </Container>
        )
    }
}
export default Workspace

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 368.375px);
    width: 100%;
    padding: 1rem 0 0 0;
    box-sizing: border-box;
`

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    border-top: 1px solid ${colors.lightGray};
    border-bottom: 1px solid ${colors.lightGray};
    padding-bottom: .5rem;
    box-sizing: border-box;
    margin-top: .5rem;
    flex: 1;
`