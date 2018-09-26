import React from 'react'
import styled from 'styled-components'

// Styles
const HeaderContainer = styled.div`
  background-color: white;
  height: 90px;
`

const Row = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const Button = styled.button`
    background-color: none;
    color: #777;
    margin-left: auto;
`

const MainHeader = (props) => {
    return(
        <HeaderContainer>
            <Row>
                <h1>I AM A HEADER</h1>
                <Button onClick={props.onClickSettings}>
                    {'Settings'}
                </Button>
            </Row>
        </HeaderContainer>
    )
}

export default MainHeader