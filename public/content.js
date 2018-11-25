// Listen for Background Script messages
// gives access to client from backend

// Not using this currently (high permissions issues)
const getIcons = () => {
    let links = document.querySelectorAll('link')
    links = Array.from(links)
    // hard filter
    let icons = links.filter(link => link.rel.includes('icon') && !!link.sizes && !!link.sizes.value && link.href.includes('.png'))
    // if filter catches 0 icons then use soft filter
    if (icons.length === 0) icons = links.filter(link => link.rel.includes('icon') && link.href.includes('.png'))
    if (icons.length === 0) icons = links.filter(link => link.href.includes('.png'))
    // return large icons else all icons
    const largeIcons = icons.filter(icon => icon.sizes.value.length >= 6)
    if (largeIcons.length > 0) return largeIcons.map(icon => icon.href)
    else return icons.map(icon => icon.href)
}

// Not using this currently (high permissions issues)
const getContent = () => {
    let p = document.querySelector('p')
    if (!p) {
        return ''
    }
    return p.innerText
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // check if sent from extension
        switch (request.type) {
            case 'UPDATE_TABS':
                // remove this in production
                window.postMessage({
                    type: "UPDATE_CHROMETABS",
                    chromeTabs: request.tabs
                }, "*")
                return
            case 'GET_CONTENT':
                let icons = getIcons()
                let content = getContent()
                sendResponse({
                    content,
                    icons
                })
                return
            default:
                return
        }
    });