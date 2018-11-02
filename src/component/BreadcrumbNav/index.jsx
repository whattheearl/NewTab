import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Text from '../Text';

// Colors
import colors from '../../styles/colors';


// Styled
const Row = styled.div`
    display: flex;
`;

const Name = styled.div`
    text-decoration: none;
    color: ${colors.babyBlue};
    font-size: 2rem;
    white-space: pre; 
`;

const Bkmrkr = styled.div`
    text-transform: lowercase;
    text-decoration: none;
    font-size: 2rem;
    color: ${colors.babyBlue};
    cursor: default;
`;

class BreadCrumbNav extends Component {
    back() {
        this.props.workspaceHandler('SELECT_WORKSPACE', {workspace: null})
    }

    render() {
        const isWorkspaceSelected = !!this.props.workspace
        let style={}
        if(isWorkspaceSelected) {
            style.color = colors.lightGray
            style.cursor = 'pointer'
        }
        return (
            <Row>
                <Bkmrkr style={style} onClick={this.back.bind(this)}>bkmrkr</Bkmrkr>
                {isWorkspaceSelected? (<Name><Text text={` / ${this.props.workspace.name}`} maxLength={33}/></Name>) : null}
            </Row>
        )
    }
}
export default BreadCrumbNav