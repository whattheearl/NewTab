import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import color from '../../styles/colors';

// Displays heading for the spacelist
class DetailHeader extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <TitleHeading>Title</TitleHeading>
                </Row>
            </Container>
        )
    }
}
export default DetailHeader;

const Container = styled.div`
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border-bottom: 1px solid ${color.darkWhite};
`;

const Row = styled.div`
    width: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

// margin-left: left pad, icon + icon padding, margin-left of title
const TitleHeading = styled.div`
    margin-left: calc(16px + 33px + 10.5px); 
    cursor: pointer;
`;