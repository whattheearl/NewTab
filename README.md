# BKMRKR
A open source chrome plugin to make navigating related tabs easier, and saving contexts

## Purpose
1. Learn to work with Chrome extension API
2. Replace the NewTab page with something more useful
3. Build more complicated UI elements

## Requirements
Links checked 11/2018
* [Git](https://git-scm.com/downloads)
* [NPM](https://www.npmjs.com/get-npm) & [Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Chrome](https://www.google.com/chrome/browser/)

## Installation
Clone (Git)
```bash
git clone https://github.com/whattheearl/NewTab.git
```

Install dependencies (Yarn)
```
cd NewTab
yarn
```

## Uses
### Development
I used create-react-app for the hot loading goodness and react developer debugging integration. The content and background scripts have to be loaded manually. I would like to find a way to hotload changes directly into the html file used for newtab but have not yet found a good solution for this.

Run development server locally
```
yarn start
```

All chrome files are stored inside /public directory. This directory loaded to chrome in order to develope the app. [Instructions](https://developer.chrome.com/extensions/getstarted#manifest)

### Build
Build process will remove previous build, build current react files for production which outputs to /build folder. The build folder is then zipped by the script as "bkmrkr.zip".

Run to output build files
```
yarn build
```

### Deployment
Detailed Instructions[upload-your-app](https://developer.chrome.com/webstore/publish#upload-your-app)

The bkmrkr.zip needs to be uploaded to chrome [Chrome Dashboard](https://chrome.google.com/webstore/developer/dashboard).


## Chrome Extension
### Background Script
Chrome extension has 2 main parts. The background script which has access to Chrome api's and can be sent messages to control Chrome.

I use the background script to listen for messages from the front-end in order to control opening closing and focusing tabs based on user actions on the newtab page.

Located at: /public/background.js

Config at: /public/manifest.json
```javascript
"background": {
    "scripts": ["background.js"],
    "persistent": false
},
    }],
```

### Content Script
Content scripts run on webpages like an injected script allowing for communication between the page and the background script through message passing. These messages can be added as event handlers to certain events on the page allowing to react to both the page and the user

I use the content script only to send updates of tab changes so that they may be render in ChromeTabArea tiles

Located at: /public/content.js

Config at: /public/manifest.json
```javascript
"content_scripts": [{
    "matches": ["http://localhost:3000/*"],
    "js": ["content.js"],
    "run_at": "document_idle"
}],
```

### Tab Permission
Permissions are required to gain access to Chrome api controls. This gives the user the ability to reject strong permissions for the extension they are trying to install. The tab permission is required for control of opening and closing tabs as well as getting feedback on when tabs are opened as well as which tabs are opened.

/public/manifest.json
```javascript
"permissions": [
    "tabs"
]
```
