// Edit Workspace
// - used to edit the name of a workspace
import React, { Component } from 'react';
import styled from 'styled-components';

// Component
import Modal from './Modal';
import Input from '../Input';

class WorkspaceEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({ value: name }) {
        let updatedWorkspace = {
            ...this.props.selectedWorkspace,
            name
        }
        this.props.workspaceHandler('REPLACE_WORKSPACE', {
            workspace: this.props.selectedWorkspace,
            updatedWorkspace
        })
        this.setState({ display: false });
        this.props.workspaceHandler('SELECT_WORKSPACE', null);
    }

    render() {
        if (!this.props.selectedWorkspace || !this.state.display) {
            return null;
        }
        return (
            <Modal title={"Editing..."} display={true}>
                <Label htmlFor="workspace-name-input">Name</Label>
                <Input
                    id="workspace-name-input"
                    placeholder={'Workspace Name'}
                    value={this.props.selectedWorkspace.name}
                    onSubmit={this.onSubmit}
                />
            </Modal>
        );
    }

}
export default WorkspaceEditModal;

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`

