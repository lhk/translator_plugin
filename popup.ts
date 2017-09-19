/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="node_modules/@types/chrome/index.d.ts" />

// send message to content script to get selected text
function querySelection(callback: (string) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (response) {
      callback(response.selection);
    });
  });
}

// send message to google translation api to get translation
function queryTranslation(translation_text : string, callback : (string) => void ) {

  var encodedText : string = encodeURI(translation_text);
  var sourceLang : string = 'auto';
  var targetLang : string = 'de';

  var url : string = "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
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
function onTranslation(translatedText) {
  // TODO: update the html
  console.log(translatedText);
  console.log("now we need to insert the translation into html");

  var translation : string = translatedText[0][0][0];
  var source : string = translatedText[0][0][1];

  $("#translation_source").text(source);
  $("#translation_target").text(translation);
}

document.addEventListener('DOMContentLoaded', () => {

  console.log("loaded popup.js");
  updateView();

  $("#translation_button").click(function () {
    console.log("button clicked");
    updateView();
  });
});
