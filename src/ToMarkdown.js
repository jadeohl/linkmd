function ToMarkdown() {

}

ToMarkdown.prototype.escapeString = function (str) {
	const escapeList = ['[', ']', '(', ')', '_'];

	escapeList.forEach(strToReplace => {
		str = str.replaceAll(strToReplace, '\\' + strToReplace);
	});

	return str;
}

ToMarkdown.prototype.collapseString = function (str) {
	// Remove line breaks and extra whitespace
	str = str.replace(/(\r\n|\n|\r)/gm, " ");
	str = str.replace(/\s+/g, " ");

	return str;
}

ToMarkdown.prototype.link = function (text, url) {
	return '[' + this.escapeString(text) + '](' + this.escapeString(url) + ')';
}

ToMarkdown.prototype.quote = function (text) {
	return '_' + this.escapeString(this.collapseString(text)) + '_';
}

ToMarkdown.prototype.quoteLink = function (quoteText, linkText, url) {
	return this.quote(quoteText) + ' - ' + this.link(linkText, url);
}

module.exports = ToMarkdown;