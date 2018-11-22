import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';

// Actions
import { updateWorkspace } from '../actions/workspace';
import { selectWorkspace } from '../actions/selectedWorkspace';

// Assets
import COLORS from '../styles/colors';

// Components
import BreadCrumb from '../component/Nav/BreadcrumbNav';
import ChromeTabArea from '../component/ChromeTabArea';
import DetailList from '../component/Workspace/DetailList';
import NameInput from '../component/Input/CreateWorkspace';
import NavPanel from '../component/Nav/NavPanel';
import SearchBar from '../component/Input/SearchBar';
import SpaceList from '../component/Workspace/SpaceList';
import WorkspaceEditModal from '../component/Modal/WorkspaceEdit';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        }
        this.sitesHandler = this.sitesHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    filterHandler(action, payload) {
        switch (action.type) {
            case 'SET_FILTER':
                this.setState({ filter: payload.filter });
                return;
            case 'CLEAR_FILTER':
                this.setState({ filter: '' });
                return;
            default:
                console.error('error unreachable switch case filter');
                return;
        }
    }

    sitesHandler(action, payload) {
        // check if workspace is selected (should throw some visable error)
        if (!this.props.selectedWorkspace) return;
        const { site } = payload;
        const { sites } = this.props.selectedWorkspace;
        let updatedWorkspace = {
            ...this.props.selectedWorkspace,
            lastModified: Date.now()
        };
        switch (action.type) {
            case 'REMOVE_SITE_FROM_SELECTED_WORKSPACE':
                const index = sites.indexOf(site)
                updatedWorkspace.sites = [
                    ...sites.slice(0, index),
                    ...sites.slice(index + 1)
                ];
                // Replace selectedWorkspace with updatedWorkspace
                this.props.updateWorkspace(updatedWorkspace);
                this.props.selectWorkspace(updatedWorkspace);
                return;
            case 'ADD_SITE_TO_SELECTED_WORKSPACE':
                // return if site exists
                if (sites.filter(s => s.url === site.url).length > 0) {
                    return;
                }
                updatedWorkspace.sites = [
                    ...sites,
                    site,
                ];
                // Replace selectedWorkspace with updatedWorkspace
                this.props.updateWorkspace(updatedWorkspace);
                this.props.selectWorkspace(updatedWorkspace);
                return;
            default:
                return;
        }
    }

    render() {
        return (
            <Router>
                <div className="page">
                    {/* pass route props to access history */}
                    <Route render={(props) => (
                        <WorkspaceEditModal
                            {...props}
                        />)}
                    />
                    <Header>
                        <BreadCrumb />
                        <SearchBar filterHandler={this.filterHandler} />
                        <div>&nbsp;</div>
                    </Header>
                    <Row>
                        <LeftCol>
                            <NavPanel
                                display={true}
                                workspaces={this.props.workspace.filter(space => !!space.saved)}
                            />
                        </LeftCol>
                        <MainArea>
                            <Switch>
                                <Route exact path='/' render={(props) => (
                                    <SpaceList
                                        {...props}
                                        filter={this.state.filter}
                                        display={true}
                                    />
                                )} />
                                <Route path='/workspace/:workspaceid' render={(props) => (
                                    <DetailList
                                        {...props}
                                        sitesHandler={this.sitesHandler}
                                    />
                                )} />
                                <Route render={() => (<Redirect to='/' />)} />
                            </Switch>
                        </MainArea>
                        <RightCol>
                            <NameInput />
                            <ChromeTabArea sitesHandler={this.sitesHandler} />
                        </RightCol>
                    </Row>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        workspace: state.workspace,
        selectedWorkspace: state.selectedWorkspace,
    }
}

export default connect(mapStateToProps, { updateWorkspace, selectWorkspace })(Page);

// styled
const MainArea = styled.div`
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
        `;

const Row = styled.div`
            height: calc(100vh - 65px);
            display: flex;
            width: 100%;
        `;

const Header = styled.div`
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 1rem;
    border-bottom: 1px solid ${COLORS.darkWhite};
                box-sizing: border-box;
            `;

const RightCol = styled.div`
                padding: 2rem;
                display: flex;
                flex-direction: column;
            `;

const LeftCol = styled.div`
                padding: 2rem 0;
                display: flex;
                flex-direction: column;
                width: 220px;
            `;

