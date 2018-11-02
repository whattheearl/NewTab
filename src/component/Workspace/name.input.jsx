/* global chrome */
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'

// Name input is used for naming workspace, may want to abstract this as a general text input
class NameInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.nameInput = React.createRef()
    }

    // maintain name state
    onKeyDown(e) {

        let key = e.key
        if(e.key === 'Backspace') {
            this.setState(state => ({name: state.name.slice(0, -1)}))
            return
        }
        // save on enter
        if(e.key === 'Enter') {
            this.onSaveButtonClick()
            return
        }
        // ignore non single characters
        if(key.length > 1) return
        this.setState(state => ({name: `${state.name}`+key}))   
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
                        onKeyDown={this.onKeyDown.bind(this)} 
                        type={'text'} 
                        placeholder={'new workspace'}
                        required={true} 
                    />
                </NameInputBorder>
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
    padding: 0 .5rem;
    border-radius: 3px;
    height: 2rem;
    margin-left: auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: ${colors.darkWhite};

    :focus-within {
        border: 1px solid ${colors.babyBlue};
    }
`

const Input = styled.input`
    width: 100%;
    font-size: 1rem;
    border: none;
    border-width: 0;
    border-style: none;
    background-color: ${colors.darkWhite};
    color: ${colors.black};
    &:focus {
        outline: none;
    }
    &::placeholder{
        color: ${colors.lightGray};
    }
`