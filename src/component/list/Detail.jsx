import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import urljoin from 'url-join';

// Actions
import { selectWorkspace, addWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// components
import DetailHeader from './DetailHeader';
import Site from '../listItem/Detail';
import VerticalScrollArea from '../container/VerticalScroll';


const API_BASE = process.env.REACT_APP_API_BASE;

fetch(urljoin(API_BASE, `/workspace/9445b2d5-f7eb-442e-8772-d694eb149ed3`))
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log('found', res);
        return;
    }).catch((err) => {
        return console.error('Cannot find workspace', this.props.match.params.workspaceid);
    })

// Renders the sites of a workspace as a list
class DetailList extends Component {
    // select the workspace in url, if not found fetch it from server
    selectWorkspaceFromParam = () => {
        let workspace = this.props.workspace[this.props.match.params.workspaceid];
        if (workspace) {
            this.props.selectWorkspace(workspace);
        }
        else {
            const workspaceUri = urljoin(API_BASE, `/workspace/${this.props.match.params.workspaceid}`)
            fetch(workspaceUri)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    console.log('adding', res);
                    const workspace = res[0];
                    debugger;
                    this.props.addWorkspace(workspace);
                    this.props.selectWorkspace(workspace);
                    return;
                }).catch((err) => {
                    return console.error('Cannot find workspace', this.props.match.params.workspaceid);
                })
        }
    }

    // Rerender there are changes to workspacestate
    componentWillUpdate(nextProps) {
        return nextProps.workspace.id !== this.props.workspace.id;
    }

    componentDidUpdate() {
        this.selectWorkspaceFromParam();
    }

    // should abstract this to HOC
    componentDidMount() {
        this.selectWorkspaceFromParam();
    }

    renderSiteList() {
        console.log(this.props.selectedWorkspace);
        return this.props.selectedWorkspace.sites
            .filter((site) => // filter sites
                site.title.includes(this.props.searchFilter)
            )
            .sort((a, b) => { // sort by name
                return ('' + a.title).localeCompare(b.title);
            })
            .map((site) => { // create Site elements
                return (
                    <Site key={site.url} site={site} />
                );
            });
    }

    render() {
        if (!this.props.selectedWorkspace) return null;
        return (
            <Container>
                <SpaceContainer>
                    <DetailHeader />
                    <VerticalScrollArea className="VerticalScrollArea">
                        {this.renderSiteList()}
                    </VerticalScrollArea>
                </SpaceContainer>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    console.log('state', state);
    return {
        workspace: state.workspace,
        selectedWorkspace: state.selectedWorkspace,
        searchFilter: state.searchFilter,
    };
}
export default connect(mapStateToProps, { selectWorkspace, addWorkspace })(DetailList);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 64px);
    flex: 1;
    width: 100%;
    box-sizing: border-box;
`;

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-bottom: 1px solid ${colors.darkWhite};
    padding-bottom: .5rem;
    box-sizing: border-box;
    flex: 1;
`;