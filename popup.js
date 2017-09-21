/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="node_modules/@types/chrome/index.d.ts" />
// send message to content script to get selected text
function querySelection(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (response) {
            callback(response.selection);
        });
    });
}
// send message to google translation api to get translation
function queryTranslation(translation_text, callback) {
    var encodedText = encodeURI(translation_text);
    var sourceLang = 'auto';
    var targetLang = 'de';
    var url = "https://translate.googleapis.com/translate_a/single" +
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
    var translatedText = "placeholder";
    var source = "Platzhalter";
    $("#translation_source").text(source);
    $("#translation_target").text(translatedText);
}
document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded popup.js");
    updateView();
    $("#translation_button").click(function () {
        console.log("button clicked");
        updateView();
    });
});
//# sourceMappingURL=popup.js.map