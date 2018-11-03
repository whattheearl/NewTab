import styled from 'styled-components'
import colors from '../../styles/colors'
// Styles
export const ModalTint = styled.section`
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

export const ModalDisplay = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 7px;
    cursor: auto;
    max-height: 100vh;
`

export const ModalContainer = styled.div`
    padding: 2rem;
`

export const TitleContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    font-weight: 500;
    font-size: 1.75rem;
    border-bottom: 1px solid #d8d8d8;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`

export const SiteLabel = styled.label`
    color: #686868;
    margin-bottom: .25rem;
    font-size: .9rem;
`

export const SiteInputBorder = styled.div`
    border: 1px solid #d8d8d8;
    margin-bottom: 1rem;
    padding: .5rem .5rem;
    border-radius: 7px;
`

export const SiteInput = styled.input`
    width: 100%;
    font-size: 1rem;
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

export const ButtonContainer = styled.div`
    display: flex;
`

export const SubmitButton = styled.button`
    margin-left: 1rem;
    font-size: 1.2rem;
    border-radius: 4px;
    background-color: white;
    color: ${colors.babyBlue};
    padding: 16px;
    cursor: pointer;
`

export const CancelButton = styled.button`
    font-size: 1.2rem;
    border-radius: 4px;
    background-color: #e2e2e2;
    margin-left: auto;
    padding: 16px;
    cursor: pointer;
`
export const RemoveButton = styled.button`
    font-size: 1.2rem;
    border-radius: 4px;
    background-color: #e2e2e2;
    padding: 16px;
    cursor: pointer;
`

export const Row = styled.div`
    display: flex;
    align-items: center;
`