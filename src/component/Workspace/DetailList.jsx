import React, { Component } from 'react';
import styled from 'styled-components';
// import { connect } from 'react-redux';

// Assets
import colors from '../../styles/colors';
import bookmarkIcon from '../../assets/image/bookmark.png';

// components
import CloseButton from '../../component/Buttons/Close';
import Thumbnail from '../Thumbnail';
import DetailHeader from './DetailHeader';


class Detail extends Component {
    componentDidUpdate() {
        if (!this.props.selectedWorkspace || String(this.props.selectedWorkspace.uuid) !== String(this.props.match.params.workspaceid)) {
            this.props.workspaceHandler('SELECT_WORKSPACE', { uuid: this.props.match.params.workspaceid });
        }
    }
    componentDidMount() {
        this.props.workspaceHandler('SELECT_WORKSPACE', { uuid: this.props.match.params.workspaceid });
    }

    renderSiteList() {
        const { selectedWorkspace } = this.props;
        return selectedWorkspace.sites.slice()
            .sort((a, b) => {
                return ('' + a.title).localeCompare(b.title);
            })
            .map((site, index) => {
                return (
                    <SiteContainer key={site.url}>
                        <Row href={site.url} target={'_blank'}>
                            <Thumbnail
                                image={site.favIconUrl}
                                backupImage={bookmarkIcon}
                                alt={site.title}
                                width={'25px'}
                                height={'25px'}
                                padding={'0 4px'}
                            />
                            <div>
                                <Title>{site.title}</Title>
                            </div>
                            {site.content}
                            <div style={{ marginLeft: 'auto' }}>
                                <CloseButton
                                    display={true}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.props.sitesHandler({ type: 'REMOVE_SITE_FROM_SELECTED_WORKSPACE' }, { site });
                                    }
                                    } />
                            </div>
                        </Row>
                    </SiteContainer>
                );
            });
    }

    render() {
        if (!this.props.selectedWorkspace) return null;
        return (
            <Container>
                <SpaceContainer>
                    <DetailHeader />
                    {this.renderSiteList()}
                </SpaceContainer>
            </Container>
        );
    }
}

export default Detail;

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
    width: 100%;
    overflow-y: auto;
    border-bottom: 1px solid ${colors.darkWhite};
    padding-bottom: .5rem;
    box-sizing: border-box;
    flex: 1;
`;

const SiteContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.darkWhite};
    padding: 0 3px 0 1px;
    :hover {
        z-index: 10;
        padding-left: 0px;
        border-left: 3px solid ${colors.babyBlue};
        box-shadow: 0 8px 3px -7px #777;
    }
`;

const Row = styled.a`
    padding: .25rem 1rem;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    margin-left: .66rem;
    margin-bottom: .2rem;
`;