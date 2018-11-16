import React from 'react';
import styled from 'styled-components'
import { IoMdCreate } from 'react-icons/io';

function Edit ({ display, onClick }) {
    if(display !== undefined && !display) return null;
    return (
        <Container onClick={ onClick }>
            <IoMdCreate />
        </Container>
    );
}
export default Edit;

const Container = styled.div`
    margin-left: .5rem;
    color: #444;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        background-color: #eee;
        color: #333;
    }
`;
