import ToMarkdown from './ToMarkdown.js';
const md = new ToMarkdown();

const closeAfterSeconds = 3;

let activeTab = {
	title: '',
	url: '',
	selectedText: ''
}

function getSelected() {
	// This function is passed to the active tab so window means that tab, not this popup
	return window.getSelection().toString();
}

async function useSelected(results) {
	activeTab.selectedText = results[0].result;

	let output = '';
	if (activeTab.selectedText === '' || activeTab.selectedText === undefined || activeTab.selectedText === null) {
		output = md.link(activeTab.title, activeTab.url);
	} else {
		output = md.quoteLink(activeTab.selectedText, activeTab.title, activeTab.url);
	}

	try {
		await navigator.clipboard.writeText(output);

		showResult('result-ok');
		hidePopup();

	} catch (err) {
		showResult('result-error');
		console.error('Failed to copy to clipboard', err);
	}
}

async function main() {
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
	main();
}

/*

 ----------------- Visual

 */
function showResult(id) {
	document.getElementById(id).style.display = 'block';
}

function hidePopup() {
	if (closeAfterSeconds > 0) {
		setTimeout(function () {
			window.close();
		}, closeAfterSeconds * 1000);
	}
}