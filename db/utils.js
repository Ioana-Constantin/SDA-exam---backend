const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('tasksApp.db');

const db_all =async (query) => {
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
            if(err){return reject(err);}
            resolve(rows);
            });
    });
}

// close the database connection
// db.close();

exports.db_all = db_all;