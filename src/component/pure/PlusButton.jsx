import React from 'react'
import styled from 'styled-components'
import {FaPlusCircle} from 'react-icons/fa'

const Button = styled.button`
    position: fixed;
    bottom: 75px;
    right: 75px;
    font-size: 75px;
    border-radius: 50%;
    border: none;
    font-weight: 100;
    padding: 0;
    margin: 0;
    color: #178EE0;
`

const PlusButton = () => {
    return (
        <Button>
            <FaPlusCircle />
        </Button>
    )
}

export default PlusButton