// Trashcan button used to remove elements

import React  from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'

let style = {
    cursor: 'pointer', 
    paddingTop: '.15rem', 
    height: '1rem', 
    width: '1rem'
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: #444;
    :hover {
        background-color: #eee;
        color: #333;
    }
`

const Close = ({ onClick, display }) => {
    if(!display) return null
        return <Container onClick={onClick}>
            <FaTrash style={style}/>
        </Container>;

}
export default Close