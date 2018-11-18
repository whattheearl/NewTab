import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    font-family: 'Lobster', cursive;
`

const Text = styled.span`
    /* background: linear-gradient(341deg, #e1306c 0%,#c13584 59%,#833ab4 79%,#5851d8 90%,#405de6 100%); */
    /* -webkit-background-clip: text; */
	/* -webkit-text-fill-color: transparent; */
`

const Logo = () => {
    return(
        <Container>
            <Text>bkmrkr</Text>
        </Container>
    )
}

export default Logo