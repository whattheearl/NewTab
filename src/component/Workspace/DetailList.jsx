import React, { Component } from 'react'
import styled from 'styled-components'

// components
import CloseButton from '../../component/Buttons/Close'

// colors
import colors from '../../styles/colors'
import autobind from 'autobind-decorator';

class Detail extends Component {

    sitesHandler(action, payload) {
        switch(action.type) {
            case 'REMOVE_SITE':
                const { site } = payload
                const { sites } = this.props.selectedWorkspace
                const index = sites.indexOf(site)
                let updatedWorkspace = {
                    ...this.props.selectedWorkspace,
                    sites:[
                        ...sites.slice(0, index),
                        ...sites.slice(index+1)
                    ]
                }
                this.props.workspaceHandler('REPLACE_WORKSPACE', { 
                    workspace: this.props.selectedWorkspace, 
                    updatedWorkspace}
                )
                this.props.workspaceHandler('SELECT_WORKSPACE', { workspace: updatedWorkspace })
                return;
            case 'ADD_SITE':
                return;
            case 'REPLACE_SITE':
                return;
            default:
                return;
        }
    }

    renderSiteList() {
        const workspace = this.props.selectedWorkspace
        return workspace.sites.map((site, index) => {
            return (
                <SiteContainer key={index}>
                    <Row>
                        <img src={site.favIconUrl} alt={'site.title'} style={{height: '25px', width: '25px'}}/>
                        <Title>{site.title}</Title>
                        {site.content}
                        <div style={{marginLeft: 'auto'}}>
                            <CloseButton 
                                display={true}
                                onClick={(e)=> {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.sitesHandler({type: 'REMOVE_SITE'}, {site});
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
    height: calc(100vh - 363.344px - 64px);
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


const Row = styled.div`
    padding: .25rem 1rem;
    display: flex;
    align-items: center;
`

const Title = styled.div`
    margin-left: .66rem;
    color: #202124;
`