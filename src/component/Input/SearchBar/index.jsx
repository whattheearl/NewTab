import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import COLORS from '../../../styles/colors';

// input is used for searching workspace
class SearchBarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.input = React.createRef();   // need this to clear on submit
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // maintain searchTerm state
    handleChange(e) {
        this.setState({ value: e.target.value });
        this.props.filterHandler({ type: 'SET_FILTER' }, { filter: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Row>
                <InputBorder>
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            innerRef={this.input}
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            type={'text'}
                            placeholder={'Search'}
                        />
                    </Form>
                </InputBorder>
            </Row>
        );
    }
}
export default SearchBarContainer;

// styled components
const Row = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    height: 2rem;
    width: 400px;
    transition: width .3s, height .3s;
    :focus-within {
        width: 420px;
        height: 2.2rem;
    }
`;

const InputBorder = styled.div`
    width: 95%;
    height: 100%;
    border: 1px solid ${COLORS.darkWhite};
    border-right: none;
    padding: 0 .5rem;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: ${COLORS.darkWhite};

    :focus-within {
        border: 1px solid ${COLORS.red};
        background-color: ${COLORS.white};
    }
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border: none;
    border-width: 0;
    border-style: none;
    background-color: ${COLORS.darkWhite};
    color: ${COLORS.black};
    &:focus {
        outline: none;
        background-color: inherit;

    }
    &::placeholder{
        color: ${COLORS.lightGray};
    }
`;