import ToMarkdown from './ToMarkdown.js';

const md = new ToMarkdown();

let activeTab = {
	title: '',
	url: '',
	selectedText: ''
}

function getSelected() {
	return window.getSelection().toString();
}

async function useSelected(results) {
	activeTab.selectedText = results[0].result;

	let output = md.quoteLink(activeTab.selectedText, activeTab.title, activeTab.url);

	try {
		await navigator.clipboard.writeText(output);
		console.log('Copied to clipboard');
	} catch (err) {
		console.error('Failed to copy to clipboard', err)
	}
}

async function getQuoteLinkForActiveTab() {
	const queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	activeTab.title = tab.title;
	activeTab.url = tab.url;

	await chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			func: getSelected
		},
		useSelected
	);
}

window.onload = function () {
	getQuoteLinkForActiveTab();
}

/*
setTimeout(function () {
	window.close();
}, 5000);
*/