import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import LocalDate from './LocalDate';
import Grid from '../../Grid';
import CloseButton from '../../Buttons/Close';
import Favorite from '../../Buttons/Favorite';
import color from '../../../styles/colors';
import Text from '../../Text';

class Header extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Title>Title</Title>
                    <DateContainer>Date</DateContainer>
                </Row>
            </Container>
        )
    }
}
export default Header

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 3px 0 1px;
`

const Row = styled.div`
    padding: 0 1rem;
    width: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`

const Title = styled.div`
    
`

const RightCol = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
    flex: 1;
`

const DateContainer = styled.div`
    width: 5rem;
    display: flex;
    justify-content: flex-end;
`