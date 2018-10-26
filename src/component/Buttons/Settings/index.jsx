import React  from 'react'
import { FaCog } from 'react-icons/fa'
import colors from '../../../styles/colors'

let style = {cursor: 'pointer', paddingTop: '.15rem', height: '1.7rem', width: '1.7rem', color: colors.lightGray}


const Settings = ({ onClick, display }) => {
    if(!display) return null
    return <FaCog style={style} onClick={onClick}/>;

}
export default Settings