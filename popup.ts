
// send message to content script to get selected text
function querySelection(callback: (string) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (response) {
      callback(response.selection);
    });
  });
}

// send message to google translation api to get translation
function queryTranslation(translation_text: string, callback: (string) => void) {

  var encodedText: string = encodeURI(translation_text);
  var sourceLang: string = 'auto';
  var targetLang: string = 'de';

  var url: string = "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&dt=bd" +
    "&dj=1" +
    "&source=input" +
    "&sl=" + sourceLang +
    "&tl=" + targetLang +
    "&dt=t&q=" + encodedText;

  $.post(url, result => callback(result));
}


// this chain of functions implements the control flow
// -> trigger an update
// -> query the currently selected text
// -> translate the selected text
// -> insert the translation into the html

// trigger the update
function updateView() {
  querySelection(onSelection);
}

// callback once the selection is known
function onSelection(selectedText) {
  queryTranslation(selectedText, onTranslation);
}

// callback once the translation is known
function onTranslation(translation) {
  // TODO: update the html
  console.log(translation);
  console.log("now we need to insert the translation into html");

  var translatedText: string = translation["sentences"][0]["trans"];
  var source: string = translation["sentences"][0]["orig"];

  $("#translation_source").val(source);
  $("#translation_target").text(translatedText);
}

document.addEventListener('DOMContentLoaded', () => {

  console.log("loaded popup.js");

  // after this window is opened, we query the current selection
  // the onSelection callback will trigger a translation
  querySelection(onSelection);

  $("#translation_button").click(function () {
    console.log("button clicked");
    onSelection($("#translation_source").val());
  });
});
