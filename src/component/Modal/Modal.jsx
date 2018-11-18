// Edit Site modal edits sites for speed dial
// -name: can change name of site
// -url: sets the site url
// -image: custom image can be used instead of default favicon
import React, {Component} from 'react';
import styled from 'styled-components';

class Modal extends Component {
    render() {
        if(!this.props.display) return null;
        return (
            <ModalTint onClick={this.closeModal}>
                <ModalDisplay onClick={(e) => { e.stopPropagation()}}>
                    <TitleContainer>
                        <h1>{this.props.title}</h1>
                    </TitleContainer>
                    <ModalContainer>
                        {this.props.children}
                    </ModalContainer>
                </ModalDisplay>
            </ModalTint>
        );
    }
    
}
export default Modal;

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
    border-radius: 7px;
    cursor: auto;
    max-height: 100vh;
`

const ModalContainer = styled.div`
    padding: 2rem;
`

const TitleContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    font-weight: 500;
    font-size: 1.75rem;
    border-bottom: 1px solid #d8d8d8;
`
