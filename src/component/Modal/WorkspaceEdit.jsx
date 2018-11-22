// Edit Workspace
// - used to edit the name of a workspace
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { toggleWorkspaceModal, updateWorkspace } from '../../actions';

// Component
import Modal from './Modal';
import Input from '../Input';

class WorkspaceEditModal extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // Change the name of the current selected workspace
    handleSubmit() {
        // update workspace and close modal
        this.props.updateWorkspace({
            ...this.props.selectedWorkspace,
            name: this.inputRef.current.value
        })
        this.handleClose();
    }

    handleClose() {
        // return home
        this.props.history.goBack();
        // close modal
        this.props.toggleWorkspaceModal();
    }

    componentDidUpdate(prevProps) {
        // do no update if no workspace selected (need to move this into editWorkspaceModal)
        if (!this.props.display || !this.props.selectedWorkspace) {
            return;
        }
        // select all text
        if (prevProps !== this.props) {
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(0, this.inputRef.current.value.length)
        }
    }

    render() {
        // do not render if no workspace selected or display is off
        if (!this.props.selectedWorkspace || !this.props.display) {
            return null;
        }
        return (
            <Modal
                title={"Editing..."}
                display={true}
                handleClose={this.handleClose}
            >
                <Label htmlFor="workspace-name-input">Name</Label>
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        id={"workspace-name-input"}
                        placeholder={'Workspace Name'}
                        inputRef={this.inputRef}
                        value={this.props.selectedWorkspace.name}
                    />
                </Form>
            </Modal>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        display: state.displayWorkspaceModal,
        selectedWorkspace: state.selectedWorkspace,
    };
};

export default connect(mapStateToProps, { toggleWorkspaceModal, updateWorkspace })(WorkspaceEditModal);

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`;

const Form = styled.form`
    width: 100%;
`;