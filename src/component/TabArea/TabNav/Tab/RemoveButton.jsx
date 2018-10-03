import React from 'react'
import styled from 'styled-components'
import {FaWindowClose} from 'react-icons/fa'

// Styled
const Button = styled.div`
    position: absolute;
    top: .2rem;
    right: .2rem;
    font-size: .75rem;
    color: tomato;
    :hover{
        cursor: pointer;
    }
`

const RemoveButton = () => {
    return (
        <Button>
            <FaWindowClose />
        </Button>
    )
}

export default RemoveButton