import React, { Component } from 'react';
import styled from 'styled-components';

// Assets
import COLOR from '../../../styles/colors';

// Components
import LocalDate from './LocalDate';
import Grid from '../../Grid';
import CloseButton from '../../Buttons/Close';
import Favorite from '../../Buttons/Favorite';
import Text from '../../Text';
import Edit from '../../Buttons/Edit';

class Space extends Component {
    render() {
        const { name, sites, lastModified } = this.props;
        return (
            <Container onClick={this.props.select} >
                <Row>
                    <Favorite display={true} isFull={this.props.workspace.saved} onClick={this.props.favorite}/>
                    <Name >
                        <Text 
                            onClick={this.props.openAllLinks}
                            text={name}
                            maxLength={33}/>
                        <EditContainer>
                            <Edit
                                display={true}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const updatedWorkspace = {
                                        ...this.props.workspace,
                                        name: 'bob',
                                    }
                                    const payload = {
                                        workspace: this.props.workspace, 
                                        updatedWorkspace: updatedWorkspace
                                    }
                                    this.props.workspaceHandler('REPLACE_WORKSPACE', payload);
                                }}/>
                        </EditContainer>
                    </Name>
                    <RightCol>
                        <Grid numColumns={10}>
                            {sites}
                        </Grid>
                    </RightCol>
                    <DateContainer>
                        <LocalDate date={lastModified}/>
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
    display: none;
    justify-content: flex-end;
    position: absolute;
    background-color: ${COLOR.white};
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 96px;
    ${Container}:hover & {
        display: flex;
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