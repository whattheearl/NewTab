// Listen for Background Script messages
// gives access to client from backend

const getIcons = () => {
    let metaIcons = document.querySelectorAll('head meta')
    metaIcons = Array.from(metaIcons)
    metaIcons = metaIcons.map(icon => icon.content || null)
    metaIcons = metaIcons.filter(icon=> icon && icon.toLowerCase().startsWith('http') && icon.toLowerCase().includes('.png'))
    let linkIcons = document.querySelectorAll('head link')
    linkIcons = Array.from(linkIcons)
    linkIcons = linkIcons.map(icon => icon.href || null)
    linkIcons = linkIcons.filter(icon => icon && icon.toLowerCase().startsWith('http') && icon.toLowerCase().includes('.png'))
    return [...metaIcons, ...linkIcons]
}

const getContent = () => {
    let p = document.querySelector('p')
    if(!p) {
        return ''
    }
    return p.innerText
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // check if sent from extension
        switch(request.type) {
            case 'UPDATE_TABS':
                // remove this in production
                window.postMessage({type: "UPDATE_CHROMETABS", chromeTabs: request.tabs}, "*")
                return
            case 'GET_CONTENT':
                let icons = getIcons()
                let content = getContent()
                sendResponse({content, icons})
                return
            default:
                return
        }
    });