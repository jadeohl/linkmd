import ToMarkdown from './ToMarkdown.js';
import Popup from './Popup.js';
const md = new ToMarkdown();
const pop = new Popup();

let activeTab = {
	title: '',
	url: '',
	selectedText: ''
}

function legacyCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		document.body.removeChild(textArea);
		if (successful) {
			pop.success();
		} else {
			pop.result('error-copy');
		}
	} catch (err) {
		pop.result('error-copy');
		console.error('Legacy clipboard error', err);
	}
}

async function useSelected(result) {
	activeTab.selectedText = result.toString();

	let output = '';
	if (activeTab.selectedText === '' || activeTab.selectedText === undefined || activeTab.selectedText === null) {
		output = md.link(activeTab.title, activeTab.url);
	} else {
		output = md.quoteLink(activeTab.selectedText, activeTab.title, activeTab.url);
	}
	legacyCopyTextToClipboard(output);
}

async function main() {
	const queryOptions = { active: true, currentWindow: true };
	let [tab] = await browser.tabs.query(queryOptions);
	activeTab.title = tab.title;
	activeTab.url = tab.url;

	if (tab.url.substr(0, 4) !== 'http') {
		pop.result('error-denied');
		console.error('http and https only');
		return;
	}

	const executing = browser.tabs.executeScript(
		{ code: "window.getSelection().toString();" }
	);
	executing.then(useSelected);
}

window.onload = function () {
	main();
}
