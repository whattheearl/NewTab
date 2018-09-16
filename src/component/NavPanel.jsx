import React from 'react'
import styled from 'styled-components'

// Styles
const Container = styled.div`
    padding: 2rem;
    background-color: #151B26;
    width: 33%;
`
const Project = styled.h1`
    color: white;
    font-size: 2rem;
    margin-bottom: .5rem;
`
// Temp code for generating objects
let projects = []
for(let i=0; i < 10; i++) {
    projects.push(<Project>{`Project${i}`}</Project>)
}

const NavPanel = () => {
    return (
        <Container>
            {projects}
        </Container>
    )
}

export default NavPanel