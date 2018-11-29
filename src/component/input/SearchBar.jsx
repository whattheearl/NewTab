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
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

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

    // clear search filter on page change
    componentDidUpdate(prevProps) {
        console.log(this.props);
        if (prevProps.location.pathname !== this.props.location.pathname) {
            console.log('inside if');
            this.props.setSearchFilter('');
            this.inputRef.current.value = '';
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    inputRef={this.inputRef}
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