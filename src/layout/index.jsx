import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';

// Actions
import { updateWorkspace, selectWorkspace } from '../actions';

// Assets
import COLORS from '../styles/colors';

// Components
import BreadCrumb from '../component/nav/BreadcrumbNav';
import ChromeTabList from '../component/list/ChromeTab';
import DetailList from '../component/list/Detail';
import NameInput from '../component/input/CreateWorkspace';
import NavPanel from '../component/nav/NavPanel';
import SearchBar from '../component/input/SearchBar';
import SpaceList from '../component/list/Space';
import WorkspaceEditModal from '../component/modal/WorkspaceEdit';

class Page extends Component {

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
                        <SearchBar />
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
                                        display={true}
                                    />
                                )} />
                                <Route path='/workspace/:workspaceid' render={(props) => (
                                    <DetailList
                                        {...props}
                                    />
                                )} />
                                <Route render={() => (<Redirect to='/' />)} />
                            </Switch>
                        </MainArea>
                        <RightCol>
                            <NameInput />
                            <ChromeTabList />
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

