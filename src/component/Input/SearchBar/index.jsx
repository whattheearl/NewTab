import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Input from '../index';

// input is used for searching workspace
class SearchBarContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // maintain searchTerm state
    handleChange(e) {
        this.props.filterHandler({ type: 'SET_FILTER' }, { filter: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    scale={1.1}
                    placeholder={'Search...'}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </Form>
        );
    }
}
export default SearchBarContainer;

const Form = styled.form`
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
`;