// Shorthand for $( document ).ready()
function getSelection() {
    var focused = document.activeElement;
    var selectedText;

    // TODO: this pattern seems like a strange browser compatibility workaround
    // what can we use that's cross platform ?
    if (focused) {
        try {
            selectedText = focused.value.substring(
                focused.selectionStart, focused.selectionEnd);
        } catch (err) {
        }
    }
    if (selectedText == undefined) {
        var sel = window.getSelection();
        var selectedText = sel.toString();
    }

    chrome.extension.sendRequest({ 'text': selectedText });
}

// central dispatcher for events
function onExtensionMessage(request) {
    alert("got message");
    if (request['getSelection'] != undefined) {
        if (!document.hasFocus()) {
            return;
        }
        getSelection();
    }
}

// jquery to fire this up once the window has loaded
$(function () {
    console.log("content script up and running");
    alert("ready");
    chrome.extension.onMessage.addListener(onExtensionMessage);
});

