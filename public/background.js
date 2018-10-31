const filterTabs = (tabs) => {
    // filter out extension and test url
    // then remove unused properties (save space)
    let filtered =  tabs.filter(tab => 
        !tab.url.startsWith('chrome') && 
        !tab.url.startsWith('http://localhost:3000') 
    );
    let removedExtraProps = filtered.map(tab => {
        return {
            url: tab.url,
            title: tab.title,
            favIconUrl: tab.favIconUrl,
        }
    });
    console.log(removedExtraProps);
    return removedExtraProps;
}

const messageHandler = (request, sender, sendResponse) => {
    console.log(filterTabs)
    switch(request.type) {
    case "GET_TABS":
        // checker( )
        chrome.tabs.query({},
            (tabs) => {
                let filtered = filterTabs(tabs)
                sendResponse({filtered})
            }
        )
        return true
    case "GET_SITE":
        chrome.tabs.sendMessage(request.to, {type: 'GET_CONTENT'}, (res) => {
            sendResponse(res)
        })
        return true
    case "CLOSE_TAB":
        chrome.tabs.remove(request.tab)
        chrome.tabs.highlight({ tabs: sender.tab.index })
        return
    case "CLOSE_ALL_TABS":
        chrome.tabs.query({},
            (tabs) => {
                let filtered = filterTabs(tabs)
                const filteredTabIds = filtered.map(tab => { return tab.id } )
                chrome.tabs.remove(filteredTabIds)
            }
        )
        return 
    case "OPEN_TABS":
        request.tabs.forEach(tab => {
            chrome.tabs.create({ url: tab.url})
        })
        chrome.tabs.highlight({ tabs: sender.tab.index })
        return
    case "FOCUS_TAB":
        let { tab } = request
        chrome.tabs.highlight({tabs: tab.index})
        return
    default: 
        sendResponse({default: true})
        return
    }
}

// Recieved Message From Client Page
chrome.runtime.onMessage.addListener(
    messageHandler
)

// message handler for dev env
chrome.runtime.onMessageExternal.addListener(
    messageHandler
)

const updateTabs = () => {
    chrome.tabs.query({},
        function(tabs){
            let filtered = tabs.filter(tab => !tab.url.startsWith('chrome') && !tab.url.startsWith('http://localhost:3000') )
            for(let i=0; i < tabs.length; i++) {
                let tab = tabs[i]
                // dont send to local host in production
                if(tab.url.startsWith("http://localhost:3000") || tab.url.startsWith("chrome://newtab")) {
                    chrome.tabs.sendMessage(tab.id, {type: 'UPDATE_TABS', tabs: filtered})
                }
            }
        }
    )
}

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        updateTabs()
    }
)

chrome.tabs.onRemoved.addListener(
    function(tabId, removeInfo) {
        updateTabs()
    }
)