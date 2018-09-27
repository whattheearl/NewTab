import React, {Component} from 'react'
import styled from 'styled-components'

// Styles
const ModalTint = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0007;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalDisplay = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
`
const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1rem;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`

const SiteLabel = styled.label`
    margin-bottom: .25rem;
    font-weight: 700;
    text-transform: uppercase;
`

const SiteInputBorder = styled.div`
    border: 1px solid #d8d8d8;
    margin-bottom: 1rem;
    padding: .5rem .5rem;
`

const SiteInput = styled.input`
    width: 100%;
    font-size: 1.2rem;
    border: none;
    border-width: 0;
    border-style: none;
    &:focus {
        outline: none;
    }
    &::placeholder{
        color: #d1d1d1;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const SubmitButton = styled.button`
    font-size: 1.2rem;

`

const CancelButton = styled.button`
    font-size: 1.2rem;
`

const Row = styled.div`
    display: flex;
    align-items: center;
`

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
        console.log('replace site', site)
        this.props.replaceSite(site)
        this.props.closeModal()
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
        console.log('render props', this.props)
        console.log('render state', this.state)
        const {displaySelf, closeModal, selectedSite} = this.props

        if(!displaySelf || !selectedSite) return null;
        const site = this.getSite()
        return (
            <ModalTint>
                <ModalDisplay>
                    <TitleContainer>
                        <h1>Editing {site.name}</h1>
                    </TitleContainer>
                    <InputContainer>
                        <SiteLabel htmlFor="SiteUrl">Url *</SiteLabel>
                        <SiteInputBorder>
                            <SiteInput 
                                name='SiteUrl' 
                                value={site.url}
                                onChange={this.handleInputChange.bind(this)} 
                                type='text' 
                                placeholder='http://siteurl.com'
                            />
                        </SiteInputBorder>
                        <SiteLabel htmlFor="SiteName">Name *</SiteLabel>
                        <SiteInputBorder>
                            <SiteInput 
                                name='SiteName' 
                                value={site.name}
                                onChange={this.handleInputChange.bind(this)} 
                                type='text' 
                                placeholder='Site Name Here' 
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
                        <CancelButton onClick={closeModal}>Cancel</CancelButton>
                        <SubmitButton onClick={this.submit.bind(this)}>Save</SubmitButton>
                    </ButtonContainer>
                </ModalDisplay>
            </ModalTint>
        )
    }
    
}

export default EditSiteModal