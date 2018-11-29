import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Assets
import colors from '../../styles/colors';

// Use to navigate between workspaces on nav panel
const NavTile = (props) => {
    // change color base on selection
    return (
        <Link to={`/workspace/${props.uuid}`}>
            <Container selected={props.selected}>
                {props.name}
            </Container>
        </Link>
    );

}
export default NavTile;

const Container = styled.div`
    padding: .5rem 1rem .5rem 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .9rem;
    font-weight: 300;
    cursor: pointer;
    background-color: ${props => props.selected ? `${colors.red}` : ''};
    color : ${props => props.selected ? `${colors.white}` : ''};
    :hover {
        background-color: ${props => !props.selected ? `${colors.darkWhite}` : ``}
    }
`;
