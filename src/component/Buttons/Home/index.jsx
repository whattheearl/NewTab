// Gear button
import React  from 'react'
import styled from 'styled-components'
import { IoMdHome } from 'react-icons/io'
import colors from '../../../styles/colors'

let style = {
    position: 'relative',
    marginRight: '.6rem',
    cursor: 'pointer',
    height: '1.4rem',
    width: '1.4rem',
    color: colors.gray,
}

const HomeButton = ({ onClick, display }) => {
    if(display !== null && !display) return null
    return (
        <Container style={{cursor: 'pointer'}} onClick={onClick}>
            <IoMdHome style={style}/> Home
        </Container>
    );

}
export default HomeButton

const Container = styled.div `
    display: flex;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 300;
`