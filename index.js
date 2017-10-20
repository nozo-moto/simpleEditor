const editor = ace.edit("rightside");
const fs=require("fs");

editor.setTheme("ace/theme/github");
editor.getSession().setMode("ace/mode/ayu-light");
editor.setShowPrintMargin(false);
editor.renderer.setShowGutter(false);
$("#rightside").on("keydown", function () {
    autoSave(saveFile);
});

$("#leftside > #memobars > #memobar").on("click", function(e){
    console.log($(this).attr("id"));
});

function autoSave(callback) {
    callback();
}

const saveFile = function () {
    fs.writeFileSync("sample.txt", editor.getValue());
    console.log('saved');
}

const readFile = function(filepath){
    const path = "./textfile/" + filepath
    fs.readFile(path, function (error, text) {
      if (error != null) {
        alert('error : ' + error);
        return;
      }
      editor.setValue(text.toString(), -1);
    });  
}
