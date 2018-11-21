// Component for navigating between open workspaces and start newtab page
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import Text from '../../Text';

// Colors
import colors from '../../../styles/colors';

// Styled
const Row = styled.div`
    display: flex;
`;

const Name = styled.div`
    text-decoration: none;
    color: ${colors.black};
    font-size: 2rem;
    white-space: pre;
    font-weight: 300;
`;

const Bkmrkr = styled.div`
    text-transform: uppercase;
    font-weight: 300;
    text-decoration: none;
    font-size: 2rem;
    color: ${colors.black};
    cursor: pointer;
`;

class BreadCrumbNav extends Component {
    back() {
        this.props.workspaceHandler('SELECT_WORKSPACE', { workspace: null })
    }

    render() {
        const isWorkspaceSelected = !!this.props.workspace
        let style = {}
        if (isWorkspaceSelected) {
            style.color = colors.lightGray
            style.cursor = 'pointer'
        }
        return (
            <Row>
                <Link to='/'>
                    <Bkmrkr style={style}>bkmrkr</Bkmrkr>
                </Link>
                {/* show bread crumb for currently selected workspace */}
                {isWorkspaceSelected ?
                    (<Name>
                        <Text text={` / ${this.props.workspace.name}`} maxLength={28} />
                    </Name>)
                    : null}
            </Row>
        )
    }
}
export default BreadCrumbNav