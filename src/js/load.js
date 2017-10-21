// 起動時の設定

// ファイル・ディレクトリを指定
const filedirectory = "./textfile/";
if (!fs.existsSync(filedirectory)) {
    fs.mkdirSync(filedirectory);
}

// 読み込み時ファイルを一覧にして並べる
const set_files_leftbar = function () {
    const leftside = document.getElementById('leftside');
    fs.readdir('./textfile', function (err, files) {
        if (err) throw err;
        files.forEach(function (e) {
            const bar = document.createElement('li');
            bar.setAttribute("id", "memobar");
            const title = document.createElement('text');
            title.appendChild(document.createTextNode(e));
            title.setAttribute('id', e)
            bar.appendChild(title);
            leftside.appendChild(bar);
        }, this);
    });
}

set_files_leftbar();