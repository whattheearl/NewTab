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

class NewSiteModal extends Component {

    submit() {
        this.props.saveSite('hi', 'hi', 'hi')
    }

    render() {
        const {displaySelf, closeModal} = this.props
        if(!displaySelf) return null;
        return (
            <ModalTint>
                <ModalDisplay>
                    <TitleContainer>
                        <h1>Add a new site</h1>
                    </TitleContainer>
                    <InputContainer>
                        <SiteLabel htmlFor="SiteUrl">Url *</SiteLabel>
                        <SiteInputBorder>
                            <SiteInput name='SiteUrl' ref={r => r} type='text' placeholder='http://siteurl.com' />
                        </SiteInputBorder>
                        <SiteLabel htmlFor="SiteName">Name *</SiteLabel>
                        <SiteInputBorder>
                            <SiteInput name='SiteName' type='text' placeholder='Site Name Here' />
                        </SiteInputBorder>
                        <SiteLabel htmlFor="SiteImage">Image</SiteLabel>
                        <SiteInput name='SiteImage' type='file' accept='image/*'/>
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

export default NewSiteModal