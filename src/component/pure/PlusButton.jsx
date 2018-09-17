import React from 'react'
import styled from 'styled-components'
import {FaPlusCircle} from 'react-icons/fa'

const Button = styled.button`
    position: fixed;
    bottom: 75px;
    right: 75px;
    font-size: 75px;
    width: 75px;
    height: 75px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 50%;
    border: none;
    padding: 0;x
    margin: 0;
    color: #178EE0;
`

const PlusButton = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            <FaPlusCircle />
        </Button>
    )
}

export default PlusButton