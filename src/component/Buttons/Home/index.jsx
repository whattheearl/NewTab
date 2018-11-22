// Gear button
import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io'
import COLORS from '../../../styles/colors'

let style = {
    position: 'relative',
    marginRight: '.6rem',
    cursor: 'pointer',
    height: '1.4rem',
    width: '1.4rem',
}

const Container = styled.div`
    padding: .5rem 2rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    background: linear-gradient(45deg, ${COLORS.white} 0%, ${COLORS.white} 50%, ${COLORS.red} 50%, ${COLORS.red} 100%);
    background-size: 220%;
    background-position: left center;
    transition: background-position .2s cubic-bezier(0.55, 0.055, 0.675, 0.19), color .3s .2s;
    transition-delay: .2s;
    ${props => props.selected ? `background-position: right center; color : ${COLORS.white};` : css`
        :hover{
            background: ${COLORS.darkWhite};
        }
    `};
    
`

const HomeButton = ({ display, selected }) => {
    if (display !== null && !display) return null
    // change color base on selection
    if (!selected) {
        style.color = COLORS.black;
    } else {
        style.color = COLORS.white;
    }

    return (
        <Link to="/">
            <Container selected={selected}>
                <IoMdHome style={style} /> Home
            </Container>
        </Link>
    );

}
export default HomeButton

