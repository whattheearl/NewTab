import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import Workspaces from '../../component/Workspace/Container'
import SpeedDial from '../../component/SpeedDial'
import ChromeTabArea from '../../component/ChromeTabArea'

// colors
import colors from '../../styles/colors'

// temp data
//TODO: remove
import data from '../../data/samplePage'
const { newPage: defaultNewPage } = data

class NewPage extends Component {
    constructor(props) {
        super(props)
        let newPage = JSON.parse(window.localStorage.getItem('newPage')) || defaultNewPage

        this.state = {
            newPage
        }
    }

    exportNewPage() {
        console.log('bytes', JSON.stringify(this.state.newPage).length)
        window.localStorage.setItem('newPage', JSON.stringify(this.state.newPage))
    }

    speedDialHandler = (action, data) => {
        let index
        switch(action) {
            case 'ADD_SITE':
                this.setState(
                    // append new site
                    state => ({
                        newPage:{
                            ...state.newPage,
                            speedDial: {
                                sites: [...state.newPage.speedDial.sites, data.site]
                            }
                        }
                    }),
                    // save to local storage
                    this.exportNewPage
                )
                return
            case 'REMOVE_SITE':
                index = this.state.newPage.speedDial.sites.indexOf(data.site)
                this.setState(state => ({
                    newPage: {
                        ...state.newPage,
                        speedDial: {
                            sites: [
                                ...state.newPage.speedDial.sites.slice(0, index),
                                ...state.newPage.speedDial.sites.slice(index + 1),
                            ]
                        }
                    }
                }),
                    this.exportNewPage
                )
                return
            case 'REPLACE_SITE':
                index = this.state.newPage.speedDial.sites.indexOf(data.site)
                this.setState(state => ({
                    newPage: {
                        ...state.newPage,
                        speedDial: {
                            sites: [
                                ...state.newPage.speedDial.sites.slice(0, index),
                                data.updatedSite,
                                ...state.newPage.speedDial.sites.slice(index + 1),
                            ]
                        }
                    }
                }),
                    this.exportNewPage
                )
                return
            default:
                console.error('speedDialHandler no use case')
                return
        }
    }

    render() {
        return (
            <Row>
                <MainArea>
                    <Workspaces />
                    <Container>
                        <SpeedDial 
                            handler={this.speedDialHandler} 
                            sites={this.state.newPage.speedDial.sites} 
                        />
                    </Container>
                </MainArea>
                <SideBar>
                    <ChromeTabArea />
                </SideBar>
            </Row>
        )
    }
}
export default NewPage

// styled
const MainArea = styled.div`
    width: calc(100vw - 500px);
    box-sizing: border-box;
    border-right: 1px solid ${colors.lightGray};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    max-width: 700px;
    width: calc(100vw - 500px);
`

const Row = styled.div`
    display: flex;
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
`

