// 仕様
// DB : SQLITE3
// PATH : src/db/db.sqlite3
// 関数
// get_memo_list メモのID一覧を返す 引数 : なし, 返り値 : リスト
// get_memodata メモの中身を返す 引数 : int (id), 返り値 : string
// get_title DBからメモのタイトルを返す 引数 : int (id), 返り値 : string
// get_edit_time 編集日時を返す 引数 : int (id), 返り値 : string
// extracting_title メモの中身からタイトルを生成する 引数: int (id), 返り値 : stirng or null
// get_unix_time UNIXTIMEを取得する 引数 : なし, 返り値 : string
// update_memo_data DBを更新する 引数 : (int id, string memodata) 返り値 : なし
// create_new_memo_data 新しいメモを作成する 引数 : なし, 返り値 : なし
// delete_memo_data メモを削除する 引数 : int(id), 返り値 : なし

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/db.sqlite3');

db.serialize(function () {
    db.get("select * from memo_data", function (err, row) {
        if (err === null) {
            console.log("table exists.");
        }
        else {
            db.run("CREATE TABLE memo_data (\
                                    id integer primary key,\
                                    title TEXT,\
                                    memodata TEXT,\
                                    edit_time TEXT\
                                )"
                , function (err) {
                    if (err) {
                        console.log(err + "ERR");
                    }
                }
            );
            console.log("create table;")
        }
    });
});

const get_memo_list = function () {
    const memolist = [];
    db.each("SELECT title from memo_data;", function (err, row) {
        memolist.push(row.id);
    });
    return memolist;
}

const get_memodata = function (id) {
    db.get("SELECT memodate from memo_data where id = " +
        id + ";", function (err, row) {
            return row;
        }
    );
}

const get_title = function (id) {
    db.get("SELECT title from memo_data where id = " +
        id + ";", function (err, row) {
            return row;
        }
    );
}

const get_edit_time = function (id) {
    db.get("SELECT edit_time from memo_data where id = " +
        id + ";", function (err, row) {
            return row;
        }
    );
}

const extracting_title = function (id) {
    const splited_memo = []
    db.get("SELECT memodate from memo_data where id = " +
        id + ";", function (err, row) {
            splited_memo = row.split("\n");
        });
    splited_memo.forEach(function (memo) {
        if (memo != false) {
            return memo;
        }
    });
    return null;
}

const get_unix_time = function () {
    const time = new Date().getTime();
    return time;
};

const update_memo_data = function (id, memodata) {
    const now_unix_time = get_unix_time();
    db.run("update memo_data set edit_time = " + now_unix_time +
        " where id = " + id + ";", function (err) {
            console.log(err);
        }
    );
    db.run("update memo_data set memodata = " + memodata +
        " where id = " + id + ";", function (err, row) {
            console.log(err);
        }
    );
    const title_text = extracting_title(id);
    db.run("update memo_data set title = " + title_text +
        " where id = " + id + ";", function (err, row) {
            console.log(err);
        }
    );
};

const create_new_memo_data = function () {
    const now_unix_time = new Date().getTime();
    db.run("insert into memo_data(\
                                title,\
                                memodata,\
                                edit_time\
                            ) values('','', "+ now_unix_time + ");", function (err) {
            console.log(err);
        }
    );
};

const delete_memo_data = function (id) {
    db.run("delete from memo_data where id = " + id + ";", function(err){
        console.log(err);
    });
}