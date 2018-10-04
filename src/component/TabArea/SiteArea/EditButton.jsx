// import React from 'react'
// import styled from 'styled-components'
// import {FaEdit} from 'react-icons/fa'

// // Styled
// const Button = styled.div`
//     display: flex;
//     top: 1em;
//     right: 2rem;
//     position: absolute;
//     font-size: 25px;
//     color: #7e7e7e;
// `

// const Text = styled.span`
//     margin-left: .5rem;
// `

// const EditButton = ({toggleEditable}) => {
//     return (
//         <Button onClick={toggleEditable}>
//             <FaEdit/>
//             <Text>Edit</Text>
//         </Button>
//     )
// }

// export default EditButton

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
    justify-content: flex-end;
`
const Button = styled.div`
    width: 8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
`

const Label = styled.span`
    margin-left: .5rem;
`

const EditTabsButton = ({toggleEditable}) => {
    return (
        <Container>
            <Button onClick={toggleEditable}>
                <FaCog/>
                <Label>Edit Book</Label>
            </Button>
        </Container>
    )
}

export default EditTabsButton