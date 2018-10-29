import React from 'react'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const minutes = 1000 * 60;
const hours = minutes * 60;
const days = hours * 24;

const LocaleDate = ({date}) => {
    let dateNum = parseInt(date, 10);

    let daysPassed = (Date.now() - dateNum)/days;
    let d = new Date(dateNum);
    if(daysPassed < 1) return <span>{d.toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</span>;
    if(daysPassed < 14) {
        return <span>{`${monthNames[d.getMonth()]} ${d.getDate()}`}</span>;
    }
    return <span>{d.toLocaleDateString([])}</span>;
}
export default LocaleDate
