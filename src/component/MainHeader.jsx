import React from 'react'
import styled from 'styled-components'

// Styles
const HeaderContainer = styled.div`
  background-color: white;
`

const Column = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MainHeader = () => {
    return(
        <HeaderContainer>
            <Column>
                <h1>I AM A HEADER</h1>
                <h1>I am bottom of header!</h1>
            </Column>
        </HeaderContainer>
    )
}

export default MainHeader