import React from 'react'
import styled from 'styled-components'
import {FaEdit} from 'react-icons/fa'

// Styled
const Button = styled.div`
    display: flex;
    top: 1em;
    right: 2rem;
    position: absolute;
    font-size: 25px;
    color: #7e7e7e;
`

const Text = styled.span`
    margin-left: .5rem;
`

const EditButton = ({toggleEditable}) => {
    return (
        <Button onClick={toggleEditable}>
            <FaEdit/>
            <Text>Edit</Text>
        </Button>
    )
}

export default EditButton