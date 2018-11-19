// Edit Workspace
// - used to edit the name of a workspace
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleWorkspaceModal } from '../../actions/toggleWorkspaceModal';

// Component
import Modal from './Modal';
import Input from '../Input';

class WorkspaceEditModal extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Change the name of the current selected workspace
    onSubmit({ value: name }) {
        // create new workspace with current name
        let updatedWorkspace = {
            ...this.props.selectedWorkspace,
            name
        }
        // replace the workspace with current
        this.props.workspaceHandler('REPLACE_WORKSPACE', {
            workspace: this.props.selectedWorkspace,
            updatedWorkspace
        })
        // unselect workspace
        this.props.workspaceHandler('SELECT_WORKSPACE', null);
        // close modal
        this.props.toggleWorkspaceModal();
    }

    render() {
        // do not render if no workspace selected or display is off
        if (!this.props.selectedWorkspace || !this.props.display) {
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
const mapStateToProps = (state) => {
    return { display: state.displayWorkspaceModal };
};

export default connect(mapStateToProps, { toggleWorkspaceModal })(WorkspaceEditModal);

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`;

