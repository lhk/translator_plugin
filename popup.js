document.addEventListener('DOMContentLoaded', () => {

  $("#translation_button").click(function () {
    alert("buttont clicked");

    // query the current selection
    chrome.extension.sendMessage({ 'getSelection': true }, (response) => {

    });
  });
});
