import React, {Component} from 'react'
import styled from 'styled-components'

// styled
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

class NewSiteModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: null,
            name: null,
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
        console.log('submit')
        const {url, name} = this.state
        if(url === null || url === '' || name === null || name === '') return
        this.props.saveSite(this.state)
        this.setState({url: null, image: null, name: null})
        this.props.closeModal()
    }

    onClick(e) {
        e.target.value = null;
    }

    render() {
        const {displaySelf, closeModal} = this.props
        if(!displaySelf) return null;
        return (
            <ModalTint>
                <ModalDisplay>
                    <TitleContainer>
                        <h1>Add a new site</h1>
                        <CancelButton onClick={closeModal}>X</CancelButton>
                    </TitleContainer>
                    <ModalContainer>
                        <InputContainer>
                            <SiteLabel htmlFor="SiteName">Name</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput name='SiteName' onChange={this.handleInputChange.bind(this)} type='text' placeholder='Site Name Here' />
                            </SiteInputBorder>
                            <SiteLabel htmlFor="SiteUrl">Url</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput name='SiteUrl' onChange={this.handleInputChange.bind(this)} type='text' placeholder='http://siteurl.com' />
                            </SiteInputBorder>
                            <SiteLabel htmlFor="SiteImage">Image</SiteLabel>
                            <Row>
                                <SiteInput name='SiteImage' onClick={this.onClick} onChange={this.handleInputChange.bind(this)} type='file' accept='image/*'/>
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

export default NewSiteModal