<img src="src/icons/icon-128.png" width="64"/>

# linkMd
Browser extension to create a markdown link of the current page with optional quote from selected text.

<img src="resources/banner1.png" width="900"/>

I built this browser extension for my own use of the [Logseq](https://logseq.com/), a note keeping application that uses [Markdown](https://daringfireball.net/projects/markdown/). This extension gives me a markdown link of the current tab with selected text included.

## Features
- Click the button or use the hotkey (default Alt + Shift + C) to copy the markdown to the clipboard. Paste the result into your destination.
- Selected text is put in italics followed by a link to the page. If no text is selected then just the link is created.
- Uses minimal code and permissions with no background process. Activating the extension inserts a 1 line function into the active tab to get any selected text.
- No 3rd party code is included in the plugin itself, referenced packages are only for testing and building.
- No data is collected and no calls are made to any websites.

## Status
I am testing this extension and haven't published this to an extension store yet. You can build it yourself if you would like to try it.
1. Build with webpack to create a ```dist``` folder.
2. From Chrome or Edge enable developer mode and load the unpacked extension from that folder.

## Future
- Options to set markdown format.

