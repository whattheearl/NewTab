/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Input from './index';

// Name input is used for naming workspace, may want to abstract this as a general text input
class CreateWorkspace extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        this.addWorkspace = this.addWorkspace.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAllTabs = this.closeAllTabs.bind(this);
    }

    addWorkspace(res) {
        // rename filtered tabs
        console.log('addworkspace');
        console.log('response', res)
        let { filtered: sites } = res
        if (sites.length === 0) return
        let name = !!this.inputRef.current.value ? this.inputRef.current.value : 'Unnamed'
        // pass sites to handler
        this.props.workspaceHandler('ADD_WORKSPACE', { sites, name })
        this.inputRef.current.value = ''
        this.closeAllTabs();
    }

    closeAllTabs() {
        if (process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                { type: "CLOSE_ALL_TABS" }
            );
        } else {
            chrome.runtime.sendMessage(
                { type: "CLOSE_ALL_TABS" }
            );
        }
    }

    // save new workspace
    handleSubmit(e) {
        e.preventDefault();
        // retrieve all tab info
        if (process.env.NODE_ENV === 'development') {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                { type: "GET_TABS" },
                this.addWorkspace
            )
        } else {
            chrome.runtime.sendMessage(
                { type: "GET_TABS" },
                this.addWorkspace
            )
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    inputRef={this.inputRef}
                    placeholder={'Save Workspace...'}
                    handleSubmit={this.handleSubmit}
                />
            </Form>
        );
    }
}
export default CreateWorkspace;

const Form = styled.form`
    display: block;
    width: 100%;
    margin-bottom: 1rem;
`;