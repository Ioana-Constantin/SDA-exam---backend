const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('tasksApp.db');

const dbAll =async (query) => {
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
            if(err){    
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const dbRunInsert =async (query, values) => {
    return new Promise(function(resolve,reject){
        db.run(query, values, function(err){
            if(err){
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
}

const dbRunUpdate =async (query, values) => {
    return new Promise(function(resolve,reject){
        db.run(query, values, function(err){
            if(err){
                return reject(err);
            }
            resolve(this.changes);
        });
    });
}

const dbRunDelete =async (query, values) => {
    return new Promise(function(resolve,reject){
        db.run(query, values, function(err){
            if(err){
                return reject(err);
            }
            resolve(`Removed entry Id:: ${values}`);
        });
    });
}

// Use for single item retrieval
const dbEach =async (query, values) => {
    return new Promise(function(resolve,reject){
        db.each(query, values, function(err, res){
            if(err){
                return reject(err);
            }
            resolve(res);
        });
    });
}

// close the database connection
// db.close();

exports.dbAll = dbAll;
exports.dbRunInsert = dbRunInsert;
exports.dbRunUpdate = dbRunUpdate;
exports.dbRunDelete = dbRunDelete;
exports.dbEach = dbEach;