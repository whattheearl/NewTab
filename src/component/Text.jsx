import React from 'react';

const TextDisplay = ({text, maxLength}) => {
    let display = text;
    if(text.length > maxLength) {
        display = `${text.slice(0, maxLength)}...`;
    }
    return (
        <div>{display}</div>
    );
}
export default TextDisplay;