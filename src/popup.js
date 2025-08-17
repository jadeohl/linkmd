function Popup() {

}

Popup.prototype.result = function (id) {
    document.getElementById(id).style.display = 'block';
};

Popup.prototype.success = function () {
    this.result('result-ok');
    this.hide();
};

Popup.prototype.hide = function () {
    const closeAfterSeconds = 3;

    if (closeAfterSeconds > 0) {
        setTimeout(function () {
            window.close();
        }, closeAfterSeconds * 1000);
    }
};

module.exports = Popup;