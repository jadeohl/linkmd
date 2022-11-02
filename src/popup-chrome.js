import ToMarkdown from './ToMarkdown.js';
import Popup from './Popup.js';
const md = new ToMarkdown();
const pop = new Popup();

let activeTab = {
	title: '',
	url: '',
	selectedText: ''
}

function getSelected() {
	// This function is passed to the active tab so window means that tab, not this popup
	return window.getSelection().toString();
}

function copyTextToClipboard(text) {
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

async function useSelected(results) {
	activeTab.selectedText = results[0].result;

	let output = '';
	if (activeTab.selectedText === '' || activeTab.selectedText === undefined || activeTab.selectedText === null) {
		output = md.link(activeTab.title, activeTab.url);
	} else {
		output = md.quoteLink(activeTab.selectedText, activeTab.title, activeTab.url);
	}

	copyTextToClipboard(output);
}

async function main() {
	const queryOptions = { active: true, currentWindow: true };

	let [tab] = await chrome.tabs.query(queryOptions);
	activeTab.title = tab.title;
	activeTab.url = tab.url;

	if (tab.url.substr(0, 4) !== 'http') {
		pop.result('error-denied');
		console.error('http and https only');
		return;
	}
	await chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			func: getSelected
		},
		useSelected
	);
}

window.onload = function () {
	main();
}
