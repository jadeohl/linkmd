function CleanUrl() {

}

CleanUrl.prototype.removeParameters = function () {
    // Remove any parameters that start with these
    const parameterPrefixRemoveList = ['utm_', 'cmpid'];

    var urlParts = this.url.split('?');
    if (urlParts.length < 2) return;

    var parameters = urlParts[1].split(/[&;]/g);
    for (var i = parameters.length; i-- > 0;) {
        var parameterToEvaluate = parameters[i];
        var prefixToRemove;
        for (var j = 0; prefixToRemove = parameterPrefixRemoveList[j]; j++) {
            if (parameterToEvaluate.toLowerCase().lastIndexOf(encodeURIComponent(prefixToRemove), 0) !== -1) {
                parameters.splice(i, 1);
                break;
            }
        }
    }

    this.url = urlParts[0] + (parameters.length > 0 ? '?' + pars.join('&') : '');
}

CleanUrl.prototype.clean = function (url) {

    if (typeof url !== 'string') return url;

    this.url = url;

    this.removeParameters();

    this.url = this.url
        .replace(/&$/, '')  // removes & if last character
        .replace(/^\?$/, '')  // removes ? if only remaining character
        ;

    return this.url;
}

module.exports = CleanUrl;