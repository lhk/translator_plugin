document.addEventListener('DOMContentLoaded', () => {

  console.log("loaded popup.js");

  $("#translation_button").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (response) {
        console.log(response.selection);

        var selectedText = response.selection;

        var sourceLang = 'auto';

        var targetLang = 'de';

        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
          + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(selectedText);

        var result = $.post(url);
        console.log(result);
      });
    });
  });
});
