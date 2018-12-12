import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { unselectWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// Components
import Space from '../listItem/Space/Container';
import VerticalScrollArea from '../container/VerticalScroll';
import Header from './SpaceHeader';

class SpaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortFunction: this.sortByName,
        }
        this.sortHandler = this.sortHandler.bind(this);
    }

    sortByCreate = (a, b) => {
        return b.created - a.created;
    }

    sortByCreateReverse = (a, b) => {
        return a.created - b.created;
    }

    sortByName = (a, b) => {
        return ('' + a.name).localeCompare(b.name);
    }

    sortByNameReverse = (a, b) => {
        return ('' + b.name).localeCompare(a.name);
    }

    sortHandler(action) {
        switch (action.type) {
            case 'SELECT_NAME':
                if (this.state.sortFunction === this.sortByName) {
                    this.setState({ sortFunction: this.sortByNameReverse });
                }
                else {
                    this.setState({ sortFunction: this.sortByName });
                }
                break;
            case 'SELECT_CREATED':
                if (this.state.sortFunction === this.sortByCreate) {
                    this.setState({ sortFunction: this.sortByCreateReverse });
                }
                else {
                    this.setState({ sortFunction: this.sortByCreate });
                }
                break;
            default:
                console.error('Unreachable switch case');
        }
    }

    componentDidMount() {
        if (!!this.props.selectedWorkspace) {
            this.props.unselectWorkspace();
        }
    }

    // Renders all workspaces
    // sort selected via header
    renderSpaces() {
        const { workspace } = this.props;
        return Object.values(workspace)
            .sort(this.state.sortFunction)
            .map((space) =>
                (<Space
                    {...this.props}
                    key={space.uuid}
                    workspace={space}
                />)
            );
    }

    render() {
        if (!this.props.workspace) return null;
        let spaces = this.renderSpaces();
        return (
            <Container className="SpaceList">
                <Header className="Header" sortHandler={this.sortHandler} />
                <VerticalScrollArea className="VerticalScrollArea">
                    {spaces}
                </VerticalScrollArea>
                <InfoContainer>{`${spaces.length.toString()} spaces created`}</InfoContainer>
            </Container>
        );
    }
}
// Redux State
const mapStateToProps = state => {
    return {
        workspace: state.workspace,
        selectedWorkspace: state.selectedWorkspace,
        searchFilter: state.searchFilter
    };
};

export default connect(mapStateToProps, { unselectWorkspace })(SpaceList);

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-bottom: 1px solid ${colors.darkWhite};
    box-sizing: border-box;
`;

const InfoContainer = styled.div`
    margin-bottom: auto;
    text-align: center;
`;