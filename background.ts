

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({ farewell: "goodbye" });
    });


function ping_content_script() {
    console.log("Called..");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
          console.log(response.farewell);
        });
      });
    setTimeout(ping_content_script, 1000);
}
//setTimeout(ping_content_script, 1000);