import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import COLORS from '../../styles/colors';

// input is used for searching workspace
class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        if (!!this.props.handleChange) {
            this.props.handleChange(e);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value });
        }
    }

    render() {
        return (
            <Container>
                <Border scale={this.props.scale}>
                    <Input
                        id={this.props.id}
                        innerRef={this.props.inputRef}
                        value={this.state.value}
                        onChange={this.handleChange}
                        type={'text'}
                        placeholder={this.props.placeholder}
                    />
                </Border>
            </Container>
        );
    }
}
export default TextInput;

// styled components
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Border = styled.div`
    width: 100%;
    border: 1px solid ${COLORS.darkWhite};
    padding: .5rem 1rem;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: ${COLORS.white};
    transition: all 0.4s;
    :focus-within {
        border: 1px solid ${COLORS.babyBlue};
        ${props => props.scale ? `transform: scale(${props.scale});` : "transform:  scale(1.05);"};
    }
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    font-weight:300;
    border: none;
    border-width: 0;
    border-style: none;
    background-color: inherit;
    color: ${COLORS.black};
    &:focus {
        outline: none;
        background-color: inherit;

    }
    &::placeholder{
        color: ${COLORS.lightGray};
    }
`;