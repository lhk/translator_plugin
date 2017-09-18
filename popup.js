document.addEventListener('DOMContentLoaded', () => {

  console.log("loaded popup.js");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "wake up"}, function(response) {
      console.log(response.farewell);
    });
  });


  $("#translation_button").click(function () {
    alert("button clicked");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "button clicked"}, function(response) {
        console.log(response.farewell);
      });
    });
  });
});
