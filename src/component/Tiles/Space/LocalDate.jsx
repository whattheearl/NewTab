import React from 'react'

const LocaleDate = ({date}) => {
    console.log(date)
    let dateNum = parseInt(date, 10)
    console.log(dateNum)
    let d = new Date(dateNum)
    console.log(d)
    return <span>{d.toLocaleDateString("en-US")}</span>;
}
export default LocaleDate
