import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

// Actions
import { setSearchFilter } from '../../actions';

// Components
import Input from './index';

// input is used for searching workspace and sites
class SearchBarInput extends Component {
    // only search after stop typing for .5sec
    debouncedHandleChange = debounce((e) => {
        this.props.setSearchFilter(e.target.value)
    }, 500);

    // maintain searchTerm state
    handleChange = (e) => {
        // turns into regular event (not synthetic)
        e.persist();
        this.debouncedHandleChange(e);
    }

    // stop page refresh
    handleSubmit = (e) => {
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

export default connect(null, { setSearchFilter })(SearchBarInput);

const Form = styled.form`
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
`;