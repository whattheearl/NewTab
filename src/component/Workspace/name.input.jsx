/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

class NameInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.nameInput = React.createRef()
    }

    // maintain name state
    onNameInputChange(e) {
        const name = e.target.value
        this.setState({name})
    }


    addWorkspace(res) {
        // rename filtered tabs
        let {filtered: sites} = res
        if(sites.length === 0) return
        let name = !!this.state.name? this.state.name : 'unnammed'
        // pass sites to handler
        this.props.workspaceHandler('ADD_WORKSPACE', {sites, name})
        this.setState({name: ''})
        this.nameInput.current.value = ''
    }

    // save new workspace
    onSaveButtonClick() {
        // retrieve all tab info
        if(process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId, 
                {type: "GET_TABS"},
                this.addWorkspace.bind(this)
            )
        } else {
            chrome.runtime.sendMessage(
                {type: "GET_TABS"},
                this.addWorkspace.bind(this)
            )
        }
    }

    render() {
        return (
            <Row>
                <NameInputBorder>
                    <Input 
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
        )
    }
}
export default NameInput

// styled components
const Row = styled.div`
    display: flex;
    align-items: center;
    height: 2rem;
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

const Input = styled.input`
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