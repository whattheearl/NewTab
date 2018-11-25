// Star button with optional filled or outline
import React  from 'react'
import styled from 'styled-components'
import { IoIosStar } from 'react-icons/io'
import { IoIosStarOutline } from 'react-icons/io'
import colors from '../../../styles/colors'

let outline = {cursor: 'pointer', padding: '0 .5rem', height: '20px', width: '20px', color: colors.lightGray}
let style = {cursor: 'pointer', padding: '0 .5rem', height: '20px', width: '20px', color: colors.babyBlue}

const Favorite = ({ onClick, display, isFull }) => {
    if(!display) return null
    // display full star if isFull otherwise outline
    if(isFull) 
        return <Container onClick={onClick}><IoIosStar style={style}/></Container>;
    else {
        return <Container onClick={onClick}><IoIosStarOutline style={outline}/></Container>;
    }
}
export default Favorite

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    :hover {
        background-color: #eee;
    }
`
