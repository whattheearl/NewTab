import React  from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoIosStarOutline } from 'react-icons/io'
import colors from '../../../styles/colors'

let outline = {cursor: 'pointer', padding: '0 .5rem', height: '2rem', width: '2rem', color: colors.lightGray}
let style = {cursor: 'pointer', padding: '0 .5rem', height: '2rem', width: '2rem', color: colors.babyBlue}

const Favorite = ({ onClick, display, isFull }) => {
    if(!display) return null
    if(isFull) 
        return <IoIosStar style={style} onClick={onClick}/>;
    else {
        return <IoIosStarOutline style={outline} onClick={onClick} />;
    }
}
export default Favorite