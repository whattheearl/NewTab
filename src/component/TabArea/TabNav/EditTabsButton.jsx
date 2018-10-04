import React from 'react'
import styled from 'styled-components'
import {FaCog} from 'react-icons/fa'


// Colors
import colors from '../../../styles/colors'

// Styled
const Container = styled.div`
    padding: .5rem 1rem;
    background-color: none;
    color: ${colors.gray};
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 100%;
    border-bottom: 1px solid ${colors.lightGray};
    :hover{
        cursor: pointer;
    }
`

const Label = styled.span`
    margin-left: .5rem;
`

const EditTabsButton = ({toggleEdit}) => {
    return (
        <Container onClick={toggleEdit} >
            <FaCog/>
            <Label>Edit Tabs</Label>
        </Container>
    )
}

export default EditTabsButton