import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import Page from './Page'
import Logo from './Logo'

// Temp Data
import defaultPage from '../../Pages/defaultPage'

// Styles
import colors from '../../styles/colors'

const Container = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    width: 256px;
    background-color: ${colors.darkBlue};
`

const PageInputBorder = styled.div`
    margin-top: auto;
    border: 1px solid #FFFB;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: .5rem .5rem;
    border-radius: 7px;
`

const PageInput = styled.input`
    width: 100%;
    font-size: 1rem;
    border: none;
    border-width: 0;
    border-style: none;
    background-color: inherit;
    color: ${colors.darkWhite};
    &:focus {
        outline: none;
    }
    &::placeholder{
        color: #FFFB;
    }
`

const NavLogo = styled.div`
    padding-left: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.white};
`

class NavPanel extends Component {
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

    renderPages() {
        const {pages, selectPage} = this.props
        return (
            pages.map(page => {
                let selected = page === this.props.selectedPage
                return (
                    <Page 
                        key={page.name} 
                        select={()=> {
                            selectPage(page)
                        }}
                        name={page.name}
                        selected={selected}
                    />
                )
            })
        )
    }

    clearCache() {
        window.localStorage.clear()
        window.location.reload()
    }

    loadTemplate() {
        window.localStorage.setItem('pages', JSON.stringify(defaultPage))
        window.location.reload()
    }

    render() {
        const {display} = this.props
        if(!display) return null
        return (
            <Container>
                <NavLogo><Logo/></NavLogo>
                {this.renderPages()}
                <PageInputBorder>
                    <PageInput type="text" name="addPage" placeholder="add a page... " onKeyUp={this.keyUp.bind(this)}/>
                </PageInputBorder>
                <h1 style={{color: 'white'}}>Temp Area</h1>
                <button onClick={this.clearCache} style={{padding: '.5rem'}}>Load Starter Data</button>
                <button onClick={this.loadTemplate} style={{padding: '.5rem'}}>Load Empty Data</button>
            </Container>
        )
    }
}

export default NavPanel