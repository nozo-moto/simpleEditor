const editor = ace.edit("rightside");
const fs=require("fs");

const filedirectory = "./textfile/"
var filename;
editor.setTheme("ace/theme/github");
editor.getSession().setMode("ace/mode/ayu-light");
editor.setShowPrintMargin(false);
editor.renderer.setShowGutter(false);
$("#rightside").on("keydown", function () {
    autoSave(saveFile);
});

$("#leftside").on("click", function(e){
    $(e.target).find('text').each(function(){
        console.log($(this).text());
        filename = $(this).text();
    });
    readFile(filename);
});

function autoSave(callback) {
    callback();
}

const saveFile = function () {
    fs.writeFileSync(filedirectory + filename, editor.getValue());
    console.log('saved');
}

const readFile = function(filepath){
    const path = filedirectory + filepath;
    fs.readFile(path, function (error, text) {
      editor.setValue(text.toString());
    });
}
