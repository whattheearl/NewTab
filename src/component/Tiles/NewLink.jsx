// Draggable Link Tile
// Allow for removal as well as reorganizing of Tiles
import React from 'react'
import styled from 'styled-components'
import { FaPlusSquare } from 'react-icons/fa'

// Colors
import colors from '../../styles/colors'

// Styled
const LinkContainer = styled.div`
    color: inherit;
    text-decoration: none;
    font-size: 2rem;
    border-radius: 15px;
    text-transform: capitalize;
    background-color: ${colors.white};
    &:hover {
        background-color: white;
        animation-name: bounce;
        animation-duration: 1s;
        animation-iteration-count: 5;
    }
`

const Name = styled.h2`
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #4e4e4e;
    word-wrap: break-word;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const NewLink = (props) => {
    const { name, select } = props
    return (
        <div style={{ cursor: 'pointer' }}>
            <LinkContainer onClick={() => { select(null) }}>
                <Column>
                    <FaPlusSquare style={{ color: `${colors.darkWhite}`, height: '109px', width: '109px', margin: '11px' }} />
                    <Name>{name}</Name>
                </Column>
            </LinkContainer>
        </div>
    )

}

export default NewLink