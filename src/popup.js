import ToMarkdown from './ToMarkdown.js';

let md = new ToMarkdown();

let info = {
	title: '',
	url: '',
	selectedText: ''
}

function getSelected() {
	return window.getSelection().toString();
}

function useSelected(results) {
	info.selectedText = results[0].result;
	console.log(info.title);
	console.log(info.url);
	console.log(info.selectedText);
}

async function getCurrentTabInfo() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	info.title = tab.title;
	info.url = tab.url;

	await chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			func: getSelected
		},
		useSelected
	);
}

window.onload = function () {
	getCurrentTabInfo();
}

/*
setTimeout(function () {
	window.close();
}, 5000);
*/