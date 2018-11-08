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
Detailed Instructions [upload-your-app](https://developer.chrome.com/webstore/publish#upload-your-app)

The bkmrkr.zip needs to be uploaded to chrome [Chrome Dashboard](https://chrome.google.com/webstore/developer/dashboard).

