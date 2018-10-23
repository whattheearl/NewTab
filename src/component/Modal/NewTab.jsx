import React, {Component} from 'react'

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
} from './styled'

class NewSiteModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: null,
        }
        this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name

        switch(name) {
            case "TabName": 
                this.setState({name: e.target.value})
                break
            default:
                break
        }
    }

    submit() {
        console.log('submit')
        const {name} = this.state
        if(name === null || name === '') return
        this.props.addTab(this.state.name)
        this.setState({name: null})
        this.props.closeModal()
    }

    onClick(e) {
        e.target.value = null;
    }

    render() {
        const {display, closeModal} = this.props
        if(!display) return null;
        return (
            <ModalTint onClick={closeModal}>
                <ModalDisplay onClick={(e)=>{e.stopPropagation()}}>
                    <TitleContainer>
                        <h1>Enter Tab Name</h1>
                        <CancelButton onClick={closeModal}>X</CancelButton>
                    </TitleContainer>
                    <ModalContainer>
                        <InputContainer>
                            <SiteLabel htmlFor="TabName">Name</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput name='TabName' onChange={this.handleInputChange.bind(this)} type='text' placeholder='Tab Name Here' />
                            </SiteInputBorder>
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