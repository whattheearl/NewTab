import React, { Component } from 'react'
import styled from 'styled-components'

import LocalDate from './LocalDate'
import Grid from '../../Grid'
import color from '../../../styles/colors'

class Space extends Component {
    render() {
        const { name, sites, lastModified} = this.props
        return (
            <Container>
                <Row>
                    <Name onClick={this.props.openAllLinks}>{name}</Name>
                    <RightCol onClick={(e) => {e.stopPropagation()}}>
                        <Grid numColumns={10}>
                            {sites}
                        </Grid>
                        <DateContainer>
                            <LocalDate date={lastModified}/>
                        </DateContainer>
                    </RightCol>
                </Row>
            </Container>
        )
    }
}
export default Space

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${color.lightGray};
    background-color: white;
    padding: 0 1px 0 1px;
    :hover {
        z-index: 10;
        padding: 0;
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