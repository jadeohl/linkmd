function CleanUrl() {

}

CleanUrl.prototype.removeParameters = function () {
    // Remove any parameters that start with these
    const parameterPrefixRemoveList = require('./trackingParameters');

    // Split URL and fragment
    const hashParts = this.url.split('#');
    const fragment = hashParts.length > 1 ? '#' + hashParts[1] : '';
    
    const urlParts = hashParts[0].split('?');
    if (urlParts.length < 2) return;

    const parameters = urlParts[1].split(/[&;]/g).filter(param => param.length > 0);
    for (let i = parameters.length; i-- > 0;) {
        const parameterToEvaluate = parameters[i];
        let prefixToRemove;
        for (let j = 0; j < parameterPrefixRemoveList.length; j++) {
            prefixToRemove = parameterPrefixRemoveList[j];
            if (parameterToEvaluate.lastIndexOf(encodeURIComponent(prefixToRemove), 0) !== -1) {
                parameters.splice(i, 1);
                break;
            }
        }
    }

    this.url = urlParts[0] + (parameters.length > 0 ? '?' + parameters.join('&') : '') + fragment;
};

CleanUrl.prototype.clean = function (url) {

    if (typeof url !== 'string') return url;

    this.url = url;

    this.removeParameters();

    this.url = this.url
        .replace(/&$/, '')  // removes & if last character
        .replace(/\?$/, '')  // removes ? if last character
    ;

    return this.url;
};

module.exports = CleanUrl;