function ToMarkdown() {

}

ToMarkdown.prototype.escapeString = function (str) {
    const escapeList = ['[', ']', '(', ')', '_', '<', '>'];

    escapeList.forEach(strToReplace => {
        str = str.replaceAll(strToReplace, '\\' + strToReplace);
    });

    return str;
};

ToMarkdown.prototype.collapseString = function (str) {
    // Remove line breaks and extra whitespace
    str = str.replace(/(\r\n|\n|\r)/gm, ' ');
    str = str.replace(/\s+/g, ' ');

    return str;
};

ToMarkdown.prototype.link = function (text, url) {
    // Escape parentheses in URL to prevent breaking markdown syntax
    const safeUrl = url.replaceAll('(', '\\(').replaceAll(')', '\\)');
    return '[' + this.escapeString(text) + '](' + safeUrl + ')';
};

ToMarkdown.prototype.quote = function (text) {
    return '_' + this.escapeString(this.collapseString(text)) + '_';
};

ToMarkdown.prototype.quoteLink = function (quoteText, linkText, url) {
    return this.quote(quoteText) + ' - ' + this.link(linkText, url);
};

module.exports = ToMarkdown;