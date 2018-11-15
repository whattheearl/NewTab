// Creates a grid area for child items
// - numColumns: how many items before a new row
// - items will be spaced evenly
import React from 'react'
import styled from 'styled-components'

const Grid = ({ children, numColumns}) => {
    let cols = Math.min(numColumns, children.length)
    const Container = styled.div`
        display: grid;
        padding: .5rem;
        grid-template-columns: repeat(${cols}, 1fr);
    `
    let items = children.map((item, index) => {
        return <Item key={index}>{item}</Item>
    })
    return (
        <Container>
            {items}
        </Container>
    )
}
export default Grid

const Item = styled.li`
    list-style: none;
`