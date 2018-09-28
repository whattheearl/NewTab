import React, {Component} from 'react'
import styled from 'styled-components'

// Styles
const Container = styled.div`
    padding: 2rem;
    background-color: #151B26;
    width: 150px;
`
const Project = styled.h1`
    color: #FFFB;
    font-size: 1rem;
    margin-bottom: 1rem;
`

const Label = styled.label`
    color: #FFFB;
`
// Temp code for generating objects
let projects = []
for(let i=0; i < 10; i++) {
    projects.push(<Project key={`${i}`}>{`Project${i}`}</Project>)
}

class NavPanel extends Component {
    constructor() {
        super()
        this.state = {
            newPage: null
        }
    }

    keyUp(e) {
        console.log(e.key)
        console.log(e.target.value)
        if(e.key === 'Enter') {
            const name = e.target.value
            if (name === '') return
            this.props.addPage(name)
            e.target.value = ''
        }

    }

    render() {
        const {display, pages, selectPage} = this.props
        if(!display) return null
        return (
            <Container>
                {pages.map(page => {
                    return (
                        <Project 
                            key={page.name} 
                            onClick={()=> {
                                console.log('page', page)
                                selectPage(page)
                            }}
                        >
                            {page.name}
                        </Project>
                    )
                })}
                <input type="text" name="addPage" placeholder="add page... " onKeyUp={this.keyUp.bind(this)}/>
            </Container>
        )
    }
}

export default NavPanel