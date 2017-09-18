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
    chrome.runtime.sendMessage({ 'text': selectedText }, function (response) {
        console.log(response.farewell);
    });
}

// jquery to fire this up once the window has loaded
$(function () {
    console.log("content script up and running");
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from somewhere else");
            console.log(request.greeting);
            if (request.greeting == "hello")
                sendResponse({ farewell: "goodbye" });
        });
});

