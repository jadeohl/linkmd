<img src="src/icons/icon-128.png" width="64"/>

# Link-Md
Chrome browser extension to create a markdown link of the current page with optional quote from selected text.

<img src="resources/banner1.png" width="900"/>

I built this browser extension for my own use of the [Logseq](https://logseq.com/), a note keeping application that uses [Markdown](https://daringfireball.net/projects/markdown/). This extension gives me a markdown link of the current tab with selected text included.

## Features
- Tested with Chrome and Edge. Should work in any modern Chromium browser.
- Click the button or use the hotkey (default Alt + Shift + C) to copy the markdown to the clipboard. Paste the result into your destination.
- Selected text is put in italics followed by a link to the page. If no text is selected then just the link is created.
- Uses minimal code and permissions with no background process. Activating the extension inserts a 1 line function into the active tab to get any selected text.
- No 3rd party code is included in the plugin itself, referenced packages are only for testing and building.
- No data is collected and no calls are made to any websites.

## Install

### From Web Store
<a href="https://chrome.google.com/webstore/detail/link-md/nfjkoojhgklbbnlonpdplbdjkgoemgod"><img src="resources/chrome-store.png" width="248"/></a>

### As Developer With Release
1. Download the latest [release](https://github.com/jadeohl/linkmd/releases) .zip and expand it somewhere on your machine.
2. Under you browser extension management enable 'Developer mode'.
3. 'Load upacked' and select the release folder

### Build Your Own
1. Clone this repo.
2. Install NPM packages.
3. Run ```npx``` then ```webpack```.
4. A ```dist``` folder will be created.
5. Follow the 'As Developer With Release' instructions above using this dist folder.

## Future
- Option to set markdown format.
- Firefox and Safari versions.

## Graphics
- Icon is based [on one by](https://www.veryicon.com/icons/miscellaneous/unionpay-digital-marketing/copy-link-face.html) Cady Weibo.
- Colors are #012a1c #67c7be
