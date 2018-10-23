import React, {Component} from 'react'
import styled from 'styled-components'

// Styles
import colors from '../../styles/colors'

import {
    ModalTint,
    ModalDisplay,
    ModalContainer,
    TitleContainer,
    InputContainer,
    SiteLabel,
    SiteInputBorder,
    SiteInput,
    ButtonContainer,
    SubmitButton,
    CancelButton
} from '../Modal/styled'

const Col = styled.div`
    display: flex;
    flex-direction: column;
`

const Thumbnail = styled.img`
    width: 100px;
    height: 100px;
`

const Title = styled.h1`
    color: ${colors.gray};
    font-size: 1.25rem;
    margin-bottom: .25rem;
`

class NewSiteModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null,
            name: null,
            image: null,
        }
        this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name

        switch(name) {
            case "SiteUrl": 
                this.setState({url: e.target.value})
                break
            case "SiteName": 
                this.setState({name: e.target.value})
                break
            case "SiteImage":
                const hasFile = e.target.files.length === 1
                if(!hasFile) return
                const fileReader = new FileReader()

                fileReader.onload = (file) => {
                    const image = file.target.result
                    console.log(image)
                    this.setState({image})
                }
                fileReader.readAsDataURL(e.target.files[0])
                break
            default:
                break
        }
    }

    submit() {
        const site = this.getSite()
        this.props.saveSite(site)
        this.props.closeModal()
        this.setState({
            url: null,
            name: null,
            image: null,
            icons: null,
        })
    }

    // image would not retrieve without this
    onClick(e) {
        e.target.value = null;
    }

    // retrieve url name image from selected site unless it has been changed by user
    getSite() {
        const {selectedSite} = this.props
        const {url} = (this.state.url!==null) ? this.state : selectedSite
        const {name} = (this.state.name!==null) ? this.state : selectedSite
        const {image} = (this.state.image!==null) ? this.state : selectedSite

        return {url, name, image}
    }

    stopProp = (e) => {
        e.stopPropagation()
    }

    close = () => {
        this.setState({
            url: null,
            name: null,
            image: null,
        })
        this.props.closeModal()
    }

    renderIcons() {
        return this.props.selectedSite.icons
            .filter((icon, index) => {
                return this.props.selectedSite.icons.indexOf(icon) === index;
            })
            .map(icon => 
                <div key={icon} style={{width: '100px', height: '100px', padding: '10px'}}>
                    <Thumbnail src={icon} alt={icon}/>
                </div>
            )
            .slice(0, 3)
    }

    render() {
        const {displaySelf, selectedSite} = this.props

        if(!displaySelf || !selectedSite) return null;
        const site = this.getSite()
        return (
            <ModalTint onClick={this.close.bind(this)}>
                <ModalDisplay onClick={this.stopProp}>
                    <TitleContainer>
                        <Col>
                            <Title>Add New Site</Title>
                            <p>{site.name}</p>
                        </Col>
                        <div style={{marginLeft: 'auto'}}>
                            <CancelButton onClick={this.close.bind(this)}>X</CancelButton>
                        </div>
                    </TitleContainer>
                    <ModalContainer >
                        <InputContainer>
                            <SiteLabel htmlFor="SiteName">Title</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput 
                                    name='SiteName' 
                                    value={site.name}
                                    onChange={this.handleInputChange.bind(this)} 
                                    type='text' 
                                    placeholder='Site Name Here'
                                    maxLength='30'
                                />
                            </SiteInputBorder>
                            <SiteLabel htmlFor="SiteUrl">Url</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput 
                                    name='SiteUrl' 
                                    value={site.url}
                                    onChange={this.handleInputChange.bind(this)} 
                                    type='text' 
                                    placeholder='http://siteurl.com'
                                />
                            </SiteInputBorder>
                            {/*<SiteLabel htmlFor="SiteImage">Image</SiteLabel>
                            <ImgArea>
                                <img style={{height: '100px', width: '100px', padding: '10px'}}src={this.props.selectedSite.image} alt={this.props.selectedSite.name}/>
                                {this.renderIcons()}
                            </ImgArea> */}
                        </InputContainer>
                        <ButtonContainer>
                            <SubmitButton onClick={this.submit.bind(this)}>Save</SubmitButton>
                        </ButtonContainer>
                    </ModalContainer>
                </ModalDisplay>
            </ModalTint>
        )
    }
    
}

export default NewSiteModal