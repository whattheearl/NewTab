import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Assets
import colors from '../../styles/colors';

// Components
import Space from '../Tiles/Space/Container';
import VerticalScrollArea from '../ContentContainers/VerticalScroll';
import Header from './SpaceHeader';

class SpaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortFunction: this.sortByCreate,
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

    renderSpaces() {
        const { workspaces } = this.props;
        if (!this.props.filter) {
            return workspaces.slice()
                .sort(this.state.sortFunction) // need to select which sor to use
                .map((space, index) =>
                    (<Space
                        {...this.props}
                        key={index}
                        workspace={space}
                        workspaceHandler={this.props.workspaceHandler}
                    />)
                );
        }
        return workspaces.slice()
            .sort(this.state.sortFunction) // need to select which sor to use
            .filter(space => { return space.name.toLowerCase().includes(this.props.filter.toLowerCase()) })
            .map((space, index) =>
                (<Space
                    key={index}
                    workspace={space}
                    workspaceHandler={this.props.workspaceHandler}
                    {...space}
                />)
            );
    }

    render() {
        if (!!this.props.selectedWorkspace) {
            return (<Redirect to={`/Workspace/${this.props.selectedWorkspace}`} />)
        }
        const { workspaces, display } = this.props;
        if (!workspaces || !display) return null;
        const spaces = this.renderSpaces();
        return (
            <Container className="SpaceList">
                <Header className="Header" sortHandler={this.sortHandler} />
                <VerticalScrollArea className="VerticalScrollArea">
                    {spaces}
                </VerticalScrollArea>
                <InfoContainer>{`${spaces.length.toString()} workspaces created`}</InfoContainer>
            </Container>
        );
    }
}
export default SpaceList;

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