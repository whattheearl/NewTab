/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addWorkspace } from '../../actions';

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
        console.log('addworkspace', res);
        let { filtered: sites } = res;
        let name = this.inputRef.current.value || 'Unnamed';
        sites = sites.map(site => {
            return {
                title: site.title,
                favIconUrl: site.favIconUrl,
                url: site.url,
                created: Date.now(),
            }
        });
        this.props.addWorkspace({ sites, name });
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
export default connect(null, { addWorkspace })(CreateWorkspace);

const Form = styled.form`
    display: block;
    width: 100%;
    margin-bottom: 1rem;
`;