// this script has only one purpose: getting selected text
// TODO: once the core features are completed, it might be nice to have
// the translation displayed as overlay to the html page
// that would be the job of this script too: inserting html into the DOM

// function to get selected text
function getSelectedText() {
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

    return selectedText;
    chrome.runtime.sendMessage({ 'text': selectedText }, function (response) {
        console.log(response.farewell);
    });
}

// jquery to fire this up once the window has loaded
$(function () {
    console.log("content script up and running");

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from somewhere else");
            console.log(request.greeting);*/

            console.log("incoming message");
            console.log(request);
            
            if(request.action == "getSelection"){
                var selectedText = getSelectedText();
                console.log("selectedText: "+selectedText);
                sendResponse({ selection: selectedText });
            }
                
        });
});

