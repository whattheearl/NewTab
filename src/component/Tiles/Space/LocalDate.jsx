import React from 'react'

const LocaleDate = ({date}) => {
    let dateNum = parseInt(date, 10)
    let d = new Date(dateNum)
    return <span>{d.toLocaleDateString("en-US")}</span>;
}
export default LocaleDate
