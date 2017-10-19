const leftside = document.getElementById('memobars');
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
