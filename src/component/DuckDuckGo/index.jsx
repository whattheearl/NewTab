import React from 'react'
import styled from 'styled-components'

const DuckDuckGo = () => (
    <Container>
        <Iframe src={"https://duckduckgo.com/search.html?prefill=Search privately with DuckDuckGo&focus=yes&kae=d"} frameborder={"0"}></Iframe>
    </Container>
)
export default DuckDuckGo

// Styled
const Iframe = styled.iframe`
    overflow: hidden;
    margin: 0;
    width: 100%;
    height: 40px;
    padding: 0 1rem;
    box-sizing: border-box;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
`