import React, {Component} from 'react'
import styled from 'styled-components'
import {FaPlusCircle} from 'react-icons/fa'
import NewTab from '../Modal/NewTab'

// Colors
import colors from '../../../styles/colors'

// Styled
const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 100%;
    border-bottom: 1px solid ${colors.lightGray};
    :hover{
        cursor: pointer;
    }
`

const style = {
    fontSize: '16px',
    color: `${colors.babyBlue}`,
    margin: '1rem 1rem 8px 1rem',
    backgroundColor: `${colors.white}`,
    borderRadius: '50%',
}

class NewTabButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayNewTabModal: false,
        }
    }

    render() {
        return (
            <Container 
                onClick={() => {
                    console.log('hey hey from my bae bae')
                    this.setState({displayNewTabModal: true})
                }}
            >
                <NewTab 
                    display={this.state.displayNewTabModal}
                    closeModal={() => {
                        this.setState({displayNewTabModal: false})
                    }}
                    addTab={this.props.addTab}
                />
                <FaPlusCircle style={style}/>
            </Container>
        )
    }
}

export default NewTabButton