import React, { Component } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
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
import SearchList from '../component/list/Search';
import WorkspaceEditModal from '../component/modal/WorkspaceEdit';

// Page dictates the layout of the APP
class Page extends Component {
    // confusing but this.props is from Page,
    // props is from router
    renderHome(props) {
        if (this.props.searchFilter) {
            return <SearchList {...props} />;
        }
        return <SpaceList {...props} />;
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
                        {/* <SearchBar /> */}
                        <Route render={(props) => (
                            <SearchBar
                                {...props}
                            />)}
                        />
                        <div>&nbsp;</div>
                    </Header>
                    <Row>
                        <LeftCol>
                            <NavPanel
                                display={true}
                                workspaces={Object.values(this.props.workspace).filter(space => !!space.saved)}
                            />
                        </LeftCol>
                        <MainArea>
                            <Switch>
                                <Route exact path='/' render={(props) => (
                                    this.renderHome(props)
                                )} />
                                <Route path='/workspace/:workspaceid' render={(props) => (
                                    <DetailList
                                        {...props}
                                    />)} />
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
        searchFilter: state.searchFilter,
    };
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

