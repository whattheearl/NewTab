import React from 'react'
import styled from 'styled-components'

// Styles
const Container = styled.div`
    padding: 2rem;
    background-color: #151B26;
    width: 150px;
`
const Project = styled.h1`
    color: #FFFA;
    font-size: 1rem;
    margin-bottom: 1rem;
`
// Temp code for generating objects
let projects = []
for(let i=0; i < 10; i++) {
    projects.push(<Project key={`${i}`}>{`Project${i}`}</Project>)
}

const NavPanel = () => {
    return (
        <Container>
            {projects}
        </Container>
    )
}

export default NavPanel