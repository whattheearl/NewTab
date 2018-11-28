import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

// Actions
import { setSearchFilter } from '../../../actions';

// Components
import Input from '../index';

// input is used for searching workspace
class SearchBarContainer extends Component {
    constructor(props) {
        super(props);
        this.debouncedHandleChange = this.debouncedHandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    debouncedHandleChange = debounce((e) => {
        console.log(e.target);
        this.props.setSearchFilter(e.target.value)
    }, 500);

    // maintain searchTerm state
    handleChange(e) {
        e.persist();
        console.log(e);
        this.debouncedHandleChange(e);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {

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

export default connect(null, { setSearchFilter })(SearchBarContainer);

const Form = styled.form`
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
`;