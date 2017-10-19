const editor = ace.edit("rightside");
const fs=require("fs");

editor.setTheme("ace/theme/github");
editor.getSession().setMode("ace/mode/text");
editor.setShowPrintMargin(false);

$("#rightside").on("keydown", function (b) {
    autoSave(saveFile);
});

function autoSave(callback) {
    callback();
}
const saveFile = function () {
    fs.writeFileSync("sample.txt", editor.getValue());
    console.log('saved');
}