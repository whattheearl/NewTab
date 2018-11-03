import React, { Component } from 'react'
import styled from 'styled-components'

// components
import CloseButton from '../../component/Buttons/Close'

// colors
import colors from '../../styles/colors'

class Detail extends Component {
    renderSiteList() {
        const workspace = this.props.selectedWorkspace
        return workspace.sites.map((site, index) => {
            return (
                <SiteContainer key={index}>
                    <Row href={site.url} target={'_blank'}>
                        <img src={site.favIconUrl} alt={'site.title'} style={{height: '25px', width: '25px'}}/>
                        <Title>{site.title}</Title>
                        {site.content}
                        <div style={{marginLeft: 'auto'}}>
                            <CloseButton 
                                display={true}
                                onClick={(e)=> {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.props.sitesHandler({type: 'REMOVE_SITE_FROM_SELECTED_WORKSPACE'}, {site});
                                }
                            }/>
                        </div>
                    </Row>
                </SiteContainer>
            )
        })
    }

    render() {
        const workspace = this.props.selectedWorkspace
        if(!workspace) return null
        return (
            <Container>
                <SpaceContainer>
                    {this.renderSiteList()}
                </SpaceContainer>
            </Container>
        )
    }
}
export default Detail

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 64px);
    flex: 1;
    width: 100%;
    box-sizing: border-box;
`

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    border-top: 1px solid ${colors.darkWhite};
    border-bottom: 1px solid ${colors.darkWhite};
    padding-bottom: .5rem;
    box-sizing: border-box;
    flex: 1;
`

const SiteContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.darkWhite};
    background-color: white;
    padding: 0 3px 0 1px;
    :hover {
        z-index: 10;
        padding-left: 0px;
        border-left: 3px solid ${colors.babyBlue};
        box-shadow: 0 8px 3px -7px #777;
    }
`

const Row = styled.a`
    padding: .25rem 1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
`

const Title = styled.div`
    margin-left: .66rem;
color: #202124;
`