// LinkPage
// Displays all links as tiles

import React, {Component} from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Component
import LinkTile from './Tile'
import PlusButton from './PlusButton'
import NewSiteModal from './NewSiteModal'
import EditButton from './EditButton'
import EditSiteModal from './EditSiteModal'

// Styled
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 800px;
    margin: 0 auto;
`

const Area = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

class LinkPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkTiles: [],
            page: props.page,
            displayNewSiteModal: false,
            editable: true,
            selectedSite: null,
        }
    }

    toggleEditable() {
        this.setState({
            editable: !this.state.editable
        })
    }

    createLinkTile({index, name, url, image}) {
        return (
            <LinkTile 
                key={`${index}`} 
                index={index}
                alt={name} 
                name={name}
                url={url} 
                image={image}
                editable={this.state.editable}
                remove={this.removeSite.bind(this)}
                move={this.moveSite.bind(this)}
                select={this.selectSite.bind(this)}
            />
        )
    }

    addSite(site) {
        // copy previous page state
        const page = this.getPageCopy()
        page.sites.push(site)
        this.props.updatePage(page)
    }

    getPageCopy() {
        let page = Object.assign({}, this.state.page)
        const updatedSites = page.sites.slice()
        page.sites = updatedSites
        return page
    }

    // remove site at index
    removeSite(index) {
        const page = this.getPageCopy()
        page.sites.splice(index, 1)
        this.props.updatePage(page)
    }

    //replaces selectedSite with site
    replaceSite(site) {
        const index = this.state.page.sites.indexOf(this.state.selectedSite)
        let page = Object.assign({}, this.state)
        page.sites.splice(index, 1, site)
        this.props.updatePage(page)
    }

    // selects site while edit is enabled
    selectSite(index) {
        this.setState({selectedSite: this.state.page.sites[index]})
        this.openEditSiteModal()
    }

    // removes source then inserts it at target
    moveSite(sourceIndex, targetIndex) {
        // do nothing if source == target
        if(sourceIndex === targetIndex) return
        // copy page
        let page = Object.assign({}, this.props.page)
        debugger;
        console.log('copied page', page)
        const updatedSites = this.props.page.sites.slice()
        // remove
        updatedSites.splice(sourceIndex, 1)
        // insert
        updatedSites.splice(targetIndex, 0, this.props.page.sites[sourceIndex])
        page.sites = updatedSites
        this.props.updatePage(page)
    }

    openEditSiteModal() {
        this.setState({displayEditSiteModal: true})
    }
    
    closeEditSiteModal() {
        this.setState({displayEditSiteModal: false})
    }

    openNewSiteModal() {
        this.setState({displayNewSiteModal: true})
    }
    
    closeNewSiteModal() {
        this.setState({displayNewSiteModal: false})
    }

    // return list of linkTiles to render
    renderLinkTiles() {
        let linkTiles = []
        const {sites} = this.state.page
        for(let i = 0; i < sites.length; i++) {
            // assign index
            let site = Object.assign({}, sites[i])
            site.index = i
            // create linkTile
            linkTiles.push(
                this.createLinkTile(site)
            )
        }
        return linkTiles
    }

    render() {
        if(this.props.page !== this.state.page) this.setState({page: this.props.page})
        return (
            <Area>
                <EditSiteModal
                    displaySelf={this.state.displayEditSiteModal} 
                    closeModal={this.closeEditSiteModal.bind(this)}
                    replaceSite={this.replaceSite.bind(this)}
                    selectedSite={this.state.selectedSite}
                />
                <NewSiteModal 
                    displaySelf={this.state.displayNewSiteModal} 
                    closeModal={this.closeNewSiteModal.bind(this)}
                    saveSite={this.addSite.bind(this)} 
                />
                <EditButton toggleEditable={this.toggleEditable.bind(this)}/>
                <Grid>
                    {this.renderLinkTiles()}
                </Grid>
                <PlusButton onClick={this.openNewSiteModal.bind(this)}></PlusButton>
            </Area>
        )
    }
}

export default DragDropContext(HTML5Backend)(LinkPage)