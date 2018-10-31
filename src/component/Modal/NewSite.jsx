/* global chrome */
import React, { Component } from 'react'

// Component
import TiledTab from '../ChromeTabArea/TabTile'

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
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            name: '',
            image: '',
            chromeTabs: null,
        }
        this.handleInputChange.bind(this)
        this.close.bind(this)
    }

    resetState() {
        this.setState({
            url: '',
            name: '',
            image: '',
            chromeTabs: null,
        })
    }

    handleInputChange(e) {
        const name = e.target.name

        switch (name) {
            case "SiteUrl":
                this.setState({ url: e.target.value })
                break
            case "SiteName":
                this.setState({ name: e.target.value })
                break
            case "SiteImage":
                const hasFile = e.target.files.length === 1
                if (!hasFile) return
                const fileReader = new FileReader()

                fileReader.onload = (file) => {
                    const image = file.target.result
                    this.setState({ image })
                }
                fileReader.readAsDataURL(e.target.files[0])
                break
            default:
                break
        }
    }

    submit() {
        const { url, name } = this.state
        if (url === '' || name === '') return
        let data = { site: Object.assign({}, this.state) }
        let action = 'ADD_SITE'
        this.props.handler(action, data)
        this.resetState()
        this.props.closeModal()
    }

    close(e) {
        e.stopPropagation()
        this.resetState()
        this.props.closeModal()
    }

    onClick(e) {
        e.target.value = null;
    }

    componentWillUpdate() {
        if (!this.state.chromeTabs) {
            chrome.runtime.sendMessage(chrome.extensionId, { type: 'GET_TABS' }, (res) => {
                let { filtered: sites } = res;
                this.setState({ chromeTabs: sites })
            })
        }
    }

    getTab(tab) {
        if (!tab) return
        let site = {
            name: tab.title,
            url: tab.url,
            image: tab.favIconUrl,
        }
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
                chrome.extensionId,
                {
                    type: "GET_SITE",
                    tab,
                },
                response => {
                    site.icons = response && response.icons ? response.icons : []
                    site.content = response && response.content ? response.content : ""
                    if (site.icons && site.icons.length > 0) site.image = site.icons[0]
                    if (response) {
                        resolve(site);
                    } else {
                        reject('sendMessage Failure');
                    }
                }
            )
        })

    }

    async selectTab(tab) {
        let site = await this.getTab(tab)
        this.setState({
            image: site.image,
            url: site.url,
            name: site.name,
            content: site.content
        })
    }

    renderTiles() {
        if (!this.state.chromeTabs) return null
        return this.state.chromeTabs.map(tab => {
            return <TiledTab
                key={tab.id}
                tab={tab}
                name={tab.title}
                image={tab.favIconUrl}
                select={this.selectTab.bind(this)}
            />
        })
    }

    render() {
        const { displaySelf } = this.props
        if (!displaySelf) return null;
        return (
            <ModalTint onClick={this.close.bind(this)}>
                <ModalDisplay onClick={(e) => { e.stopPropagation() }}>
                    <TitleContainer>
                        <h1>Add Shortcut</h1>
                    </TitleContainer>
                    <ModalContainer>
                        {this.renderTiles()}
                        <InputContainer>
                            <SiteLabel htmlFor="SiteName">Name</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput
                                    name={'SiteName'}
                                    value={this.state.name}
                                    onChange={this.handleInputChange.bind(this)}
                                    type={'text'}
                                    placeholder={'Site Name Here'}
                                />
                            </SiteInputBorder>
                            <SiteLabel htmlFor="SiteUrl">Url</SiteLabel>
                            <SiteInputBorder>
                                <SiteInput
                                    name={'SiteUrl'}
                                    value={this.state.url}
                                    onChange={this.handleInputChange.bind(this)}
                                    type={'text'}
                                    placeholder={'http://siteurl.com'}
                                />
                            </SiteInputBorder>
                            <SiteLabel htmlFor="SiteImage">Image</SiteLabel>
                            <Row>
                                <SiteInput name='SiteImage' onClick={this.onClick} onChange={this.handleInputChange.bind(this)} type='file' accept='image/*' />
                            </Row>
                        </InputContainer>
                        <ButtonContainer>
                            <CancelButton onClick={this.close.bind(this)}>Cancel</CancelButton>
                            <SubmitButton onClick={this.submit.bind(this)}>Done</SubmitButton>
                        </ButtonContainer>
                    </ModalContainer>
                </ModalDisplay>
            </ModalTint>
        )
    }

}

export default NewSiteModal