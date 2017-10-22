// ライブラリの読み込み
const fs = require("fs");
const editor = ace.edit("rightside");

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// +++++ 起動時の設定

// ファイル・ディレクトリを指定
// ---------------------------------------------------------------------------------
const filedirectory = "./textfile/";
if (!fs.existsSync(filedirectory)) {
    fs.mkdirSync(filedirectory);
}
// ---------------------------------------------------------------------------------


// ファイルを一覧にして並べる
const set_files_leftbar = function () {
    const leftside = document.getElementById('leftside');
    fs.readdir('./textfile', function (err, files) {
        if (err) throw err;
        // 一番最初のファイルをエディターに読み込ませる
        setEditor(files[0]);
        files.forEach(function (e) {
            const bar = document.createElement('li');
            bar.setAttribute("id", "memobar");
            const title = document.createElement('text');
            title.appendChild(document.createTextNode(e));
            title.setAttribute('id', e)
            bar.appendChild(title);
            leftside.appendChild(bar);
        }, this);
        $('#' + files[0]).parent().css('background','MistyRose');
    });
}
set_files_leftbar();

// ---------------------------------------------------------------------------------

// editor の設定をする関数
// ---------------------------------------------------------------------------------
const setEditor = function (filename) { 
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/ayu-light");
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    readFile(filename);
}
// ---------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
