import React, {Component} from 'react'

// Styles
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
    CancelButton,
    Row
} from './styled'

class EditSiteModal extends Component {
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
        this.props.replaceSite(site)
        this.props.closeModal()
        this.setState({
            url: null,
            name: null,
            image: null,
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

    render() {
        const {displaySelf, closeModal, selectedSite} = this.props

        if(!displaySelf || !selectedSite) return null;
        const site = this.getSite()
        return (
            <ModalTint>
                <ModalDisplay>
                    <TitleContainer>
                        <h1>Editing {site.name}</h1>
                        <CancelButton onClick={closeModal}>X</CancelButton>
                    </TitleContainer>
                    <ModalContainer>
                        <InputContainer>
                            <SiteLabel htmlFor="SiteName">Name</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput 
                                    name='SiteName' 
                                    value={site.name}
                                    onChange={this.handleInputChange.bind(this)} 
                                    type='text' 
                                    placeholder='Site Name Here' 
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
                            <SiteLabel htmlFor="SiteImage">Image</SiteLabel>
                            <Row>
                                <SiteInput 
                                    name='SiteImage'
                                    onClick={this.onClick} 
                                    onChange={this.handleInputChange.bind(this)} 
                                    type='file' 
                                    accept='image/*'
                                />
                            </Row>
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

export default EditSiteModal