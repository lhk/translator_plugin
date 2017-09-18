document.addEventListener('DOMContentLoaded', () => {

  console.log("loaded popup.js");

  $("#translation_button").click(function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getSelection"}, function(response) {
        console.log(response.selection);
      });
    });
  });
});
