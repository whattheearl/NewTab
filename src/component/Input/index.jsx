import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import COLORS from '../../styles/colors';

// input is used for searching workspace
class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.input = React.createRef();   // need this to clear on submit
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.focus = this.focus.bind(this);
    }

    // maintain searchTerm state
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!!this.props.onSubmit) this.props.onSubmit(this.state);
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value }, this.focus());
        }
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.input.current.focus();
        this.input.current.setSelectionRange(0, this.input.current.value.length);
    }

    render() {
        console.log(this.props, this.state);
        return (
            <Container>
                <Border>
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            id={this.props.id}
                            innerRef={this.input}
                            value={this.state.value}
                            onChange={this.handleChange}
                            type={'text'}
                            placeholder={this.props.placeholder}
                        />
                    </Form>
                </Border>
            </Container>
        );
    }
}
export default TextInput;

// styled components
const Container = styled.div`
    height: 2rem;
    width: 100%;
    position: relative;
`

const Border = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* margin: 0 auto; */
    width: 100%;
    height: 100%;
    border: 1px solid ${COLORS.darkWhite};
    padding: 0 .5rem;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: ${COLORS.white};
    /* background-color: ${COLORS.darkWhite}; */
    transition: all 0.4s;
    :focus-within {
        border: 1px solid ${COLORS.babyBlue};
        transform: translate(-50%, -50%) scale(1.01);
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