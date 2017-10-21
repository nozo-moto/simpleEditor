// 左側のバーの操作

// 左側のファイルがクリックされた際、ファイルを読み込み、Editorで編集できるようにする。
const select_file = function (e) {
    $(e.target).find('text').each(function () {
        console.log($(this).text());
        filename = $(this).text();
    });
    readFile(filename);
}

$("#leftside").on("click", select_file(e));

// ファイルを読み込みEditorにセットする
const readFile = function (filepath) {
    const path = filedirectory + filepath;
    fs.readFile(path, function (error, text) {
        editor.setValue(text.toString());
    });
}


// 右側のバーの操作


// editor の設定をする
// ---------------------------------------------------------------------------------
const setEditor = function () { 
    const editor = ace.edit("rightside");
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/ayu-light");
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    readFile();
}
// ---------------------------------------------------------------------------------

// オートセーブ機能
// ---------------------------------------------------------------------------------
$("#rightside").on("keydown", function () {
    autoSave(saveFile);
});

function autoSave(callback) {
    callback();
}

const saveFile = function () {
    fs.writeFileSync(filedirectory + filename, editor.getValue());
}
// ---------------------------------------------------------------------------------

