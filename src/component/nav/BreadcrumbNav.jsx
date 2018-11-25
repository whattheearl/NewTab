// Component for navigating between open workspaces and start newtab page
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Text from '../container/Text';

// Colors../../styles/colors
import colors from '../../styles/colors';

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
    render() {
        let style = {}
        if (!!this.props.selectedWorkspace) {
            style.color = colors.lightGray
            style.cursor = 'pointer'
        }
        return (
            <Row>
                <Link to='/'>
                    <Bkmrkr style={style}>bkmrkr</Bkmrkr>
                </Link>
                {/* show bread crumb for currently selected workspace */}
                {this.props.selectedWorkspace ?
                    (<Name>
                        <Text text={` / ${this.props.selectedWorkspace.name}`} maxLength={28} />
                    </Name>)
                    : null}
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedWorkspace: state.selectedWorkspace,
    }
}

export default connect(mapStateToProps)(BreadCrumbNav);