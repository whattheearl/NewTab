/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'

// colors
import colors from '../../styles/colors'

// Components
import Space from '../Tiles/Space/Container'

class Workspace extends Component {
    constructor(props) {
        super(props)
        this.nameInput = React.createRef()
    }

    // save new workspace
    onSaveButtonClick() {
        // retrieve all tab info
        chrome.runtime.sendMessage(
            chrome.extensionId, 
            {type: "GET_TABS"},
            (res) => {
                // rename filtered tabs
                let {filtered: sites} = res
                if(sites.length === 0) return
                // pass sites to handler
                this.props.workspaceHandler('ADD_WORKSPACE', {sites})
            }
        )
    }


    onNameInputChange(e) {
        const name = e.target.value
        const payload = {name}
        // set name to current value in name input
        this.props.nameHandler('SET_NAME', payload)
    }

    render() {
        const { workspaces } = this.props
        if(!workspaces) return null
        return (
            <Container>
                <Row>
                    <NameInputBorder>
                        <NameInput 
                            innerRef={this.nameInput}
                            value={this.props.name} 
                            onChange={this.onNameInputChange.bind(this)} 
                            type={'text'} 
                            placeholder={'new workspace'}
                            required={true} 
                        />
                    </NameInputBorder>
                    <SaveWorkspaceButton onClick={this.onSaveButtonClick.bind(this)}>Save</SaveWorkspaceButton>
                </Row>
                <SpaceContainer>
                    {this.props.workspaces.slice()
                        .sort((a, b) => { return b.lastModified - a.lastModified })
                        .map((space, index) => {
                            return <Space key={index} {...space} />
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
    padding: 1rem 1rem 0 1rem;
    box-sizing: border-box;
`

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    border: 1px solid ${colors.lightGray};
    padding-bottom: .5rem;
    box-sizing: border-box;
    margin-top: .5rem;
    flex: 1;
`

const Row = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    padding-bottom: .5rem;
`

const SaveWorkspaceButton = styled.button`
    border-radius:  0  3px 3px 0;
    height: 2rem;
    background-color: ${colors.darkWhite};
    border: 1px solid ${colors.darkWhite};
    :hover{
        border: 1px solid ${colors.gray};
        box-sizing: border-box;
    }
`

const NameInputBorder = styled.div`
    border: 1px solid ${colors.darkWhite};
    border-right: none;
    background-color: white;
    padding: 0 .5rem;
    border-radius: 3px 0 0 3px;
    height: 2rem;
    margin-left: auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    :focus-within {
        border: 1px solid ${colors.babyBlue};
    }
`

const NameInput = styled.input`
    width: 100%;
    font-size: 1.25rem;
    border: none;
    border-width: 0;
    border-style: none;
    background-color: inherit;
    color: ${colors.gray};
    &:focus {
        outline: none;
    }
    &::placeholder{
        color: ${colors.lightGray};
    }
`
