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
    RemoveButton,
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
        this.removeSite.bind(this)
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

    removeSite() {
        this.props.handler('REMOVE_SITE', {site: this.props.site})
        this.closeModal()
    }

    submit() {
        const site = this.getSite()
        this.props.handler('REPLACE_SITE', {site: this.props.site, updatedSite: site})
        this.closeModal()
    }

    closeModal() {
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
        const {site} = this.props
        const {url} = (this.state.url!==null) ? this.state : site
        const {name} = (this.state.name!==null) ? this.state : site
        const {image} = (this.state.image!==null) ? this.state : site

        return {url, name, image}
    }

    render() {
        const {displaySelf} = this.props
        if(!displaySelf || !this.props.site) return null;
        const site = this.getSite()
        return (
            <ModalTint onClick={this.closeModal.bind(this)}>
                <ModalDisplay onClick={(e) => { e.stopPropagation()}}>
                    <TitleContainer>
                        <h1>Editing {site.name}</h1>
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
                            <RemoveButton onClick={this.removeSite.bind(this)}>Remove</RemoveButton>
                            <CancelButton onClick={this.closeModal.bind(this)}>Cancel</CancelButton>
                            <SubmitButton onClick={this.submit.bind(this)}>Done</SubmitButton>
                        </ButtonContainer>
                    </ModalContainer>
                </ModalDisplay>
            </ModalTint>
        )
    }
    
}

export default EditSiteModal