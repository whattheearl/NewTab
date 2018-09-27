import React from 'react'
import styled from 'styled-components'

// Styled
const Row = styled.div`
    display: flex;
    /* justify-content: flex-end; */
`

const Button = styled.button`

`

const EditButton = ({toggleEditable}) => {
    return (
        <Row>
            <Button onClick={toggleEditable}>
                {'Edit'}
            </Button>
        </Row>
    )
}

export default EditButton