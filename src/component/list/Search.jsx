import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { unselectWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// Components
import Space from '../listItem/Space/Container';
import Site from '../listItem/Detail';
import VerticalScrollArea from '../container/VerticalScroll';
import Header from './DetailHeader';

class SearchList extends Component {

    renderSearch() {
        if (!this.props.searchFilter) return null;
        const { workspace } = this.props;
        // get all sites that match search
        let sites = workspace.reduce((accumulater, space) => { return accumulater.concat(space.sites) }, [])
            .filter(site => {
                return (
                    site.url.toLowerCase().includes(this.props.searchFilter.toLowerCase()) ||
                    site.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())
                )
            })
            .sort((a, b) => ('' + a.title).localeCompare(b.title))
            .map((site, index) => <Site key={`site_${index}`} site={site} />)
        // get all workspaces whose name matches
        let spaces = workspace.slice()
            .filter(space => { return space.name.toLowerCase().includes(this.props.searchFilter.toLowerCase()) })
            .sort((a, b) => ('' + a.name).localeCompare(b.name)) // need to select which sor to use
            .map((space, index) =>
                (<Space
                    {...this.props}
                    key={space.uuid}
                    workspace={space}
                />)
            );
        let both = spaces.concat(sites);
        return both;

    }

    componentDidMount() {
        if (!!this.props.selectedWorkspace) {
            this.props.unselectWorkspace();
        }
    }

    render() {
        const { workspace, display } = this.props;
        if (!workspace || display === false) return null;
        return (
            <Container className="SearchList">
                <Header className="Header" />
                <VerticalScrollArea className="VerticalScrollArea">
                    {this.renderSearch()}
                </VerticalScrollArea>
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

export default connect(mapStateToProps, { unselectWorkspace })(SearchList);

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