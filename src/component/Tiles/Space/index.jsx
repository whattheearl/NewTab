import React, { Component } from 'react';
import styled from 'styled-components';

import LocalDate from './LocalDate';
import Grid from '../../Grid';
import CloseButton from '../../Buttons/Close';
import Favorite from '../../Buttons/Favorite';
import color from '../../../styles/colors';
import Text from '../../Text';

class Space extends Component {
    render() {
        const { name, sites, lastModified } = this.props
        return (
            <Container onClick={this.props.select} >
                <Row>
                    <Favorite display={true} isFull={this.props.workspace.saved} onClick={this.props.favorite}/>
                    <Name onClick={this.props.openAllLinks}>
                        <Text text={name} maxLength={33}/>
                    </Name>
                    <RightCol>
                        <Grid numColumns={10}>
                            {sites}
                        </Grid>
                        <DateContainer>
                            <LocalDate date={lastModified}/>
                        </DateContainer>
                    </RightCol>
                    <CloseButton display={true} onClick={this.props.remove} />
                </Row>
            </Container>
        )
    }
}
export default Space

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${color.darkWhite};
    background-color: white;
    padding: 0 3px 0 1px;
    cursor: pointer;
    :hover {
        z-index: 10;
        padding-left: 0px;
        border-left: 3px solid ${color.babyBlue};
        box-shadow: 0 8px 3px -7px #777;
    }
`

const Row = styled.div`
    padding: 0 1rem;
    width: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`

const RightCol = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
    flex: 1;
`

const Name = styled.div`
    color: #000;
    max-width: 22rem;
    overflow: hidden;
    cursor: pointer;
    :hover {
        text-decoration: underline;
        color: ${color.gray};
    }
`

const DateContainer = styled.div`
    width: 5rem;
    display: flex;
    justify-content: flex-end;
`