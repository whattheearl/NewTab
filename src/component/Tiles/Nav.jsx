import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Assets
import colors from '../../styles/colors';

let style = {
    position: 'relative',
    marginRight: '.6rem',
    cursor: 'pointer',
    height: '1.4rem',
    width: '1.4rem',
};

const Container = styled.div`
    padding: .5rem 1rem .5rem 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .9rem;
    font-weight: 300;
    cursor: pointer;
    ${props => props.selected ? `background-color: ${colors.red}; color : ${colors.white};` : ''};
    :hover {
        ${props => !props.selected ? `background-color: ${colors.darkWhite};` : ``}
    }
`;

// Use to navigate between workspaces on nav panel
const NavTile = (props) => {
    // change color base on selection
    if (!props.selected) {
        style.color = colors.black;
    } else {
        style.color = colors.white;
    }
    let url = `/Workspace/${props.uuid}`;
    return (
        <Link to={url}>
            <Container selected={props.selected}>
                {/* <Text text={name} maxLength={19} /> */}
                {props.name}
            </Container>
        </Link>
    );

}
export default NavTile;

