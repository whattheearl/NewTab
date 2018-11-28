import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import COLOR from '../../../styles/colors';

// Components
import LocalDate from './LocalDate';
import Grid from '../../container/Grid';
import CloseButton from '../../icon/Trash';
import Favorite from '../../button/Favorite';
import Text from '../../container/Text';
import Edit from '../../icon/Pencil';

class Space extends Component {
    render() {
        return (
            <Container>
                <Row onClick={this.props.select}>
                    <Favorite
                        display={true}
                        isFull={this.props.saved}
                        onClick={this.props.favorite} />
                    <Name >
                        <div onClick={this.props.openAllLinks}>
                            <Text
                                text={this.props.name}
                                maxLength={33} />
                        </div>
                        <EditContainer>
                            <Edit
                                display={true}
                                onClick={this.props.edit}
                            />
                        </EditContainer>
                    </Name>
                    <RightCol>
                        <Grid numColumns={10}>
                            {this.props.sites}
                        </Grid>
                    </RightCol>
                    <DateContainer>
                        <LocalDate date={this.props.created} />
                    </DateContainer>
                    <IconContainer>
                        <CloseButton display={true} onClick={this.props.remove} />
                    </IconContainer>
                </Row>
            </Container>
        );
    }
}
export default Space;

const Container = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${COLOR.darkWhite};
    cursor: pointer;
    :hover {
        z-index: 10;
        padding-left: 0px;
        border-left: 3px solid ${COLOR.babyBlue};
        box-shadow: 0 8px 3px -7px #777;
    }
`;

const EditContainer = styled.div`
    display: none;
    ${Container}:hover & {
        display: block;
    }
`;

const IconContainer = styled.div`
    display: flex;
    opacity: 0;
    justify-content: flex-end;
    position: absolute;
    background-color: ${COLOR.white};
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 96px;
    ${Container}:hover & {
        opacity: 1;
    }
`;


const Row = styled.div`
    padding: 0 1rem;
    width: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

const RightCol = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    width: 346px;
`;

const Name = styled.div`
    display: flex;
    align-content: center;
    max-width: 22rem;
    text-overflow: ellipsis;
    cursor: pointer;
    :hover {
        text-decoration: underline;
        color: ${COLOR.gray};
    }
`;

const DateContainer = styled.div`
    width: 5rem;
`;