var sqlite3 = require('sqlite3').verbose();

// Creating the new DB
var db = new sqlite3.Database('tasksApp.db');

// Creating the tables
db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        user_id INTEGER,
        status_id INTEGER,
        title TEXT,
        due_date TEXT,
        details TEXT
    )`
);

db.run(
    `CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT
    )`
);

db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        first_name TEXT,
        last_name TEXT
    )`
);

db.run(
    `CREATE TABLE IF NOT EXISTS status (
        id INTEGER PRIMARY KEY NOT NULL,
        description TEXT
    )`
);

db.run(
    `CREATE TABLE IF NOT EXISTS task_department_assign (
        task_id INTEGER NOT NULL,
        department_id INTEGER NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id)
        FOREIGN KEY (department_id) REFERENCES departments(id)
        PRIMARY KEY (task_id, department_id)
    )`
);



// check if the tables were created
db.serialize(function () {
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
        console.log(`
-----------------------------------------------
${JSON.stringify(tables, null, 1)}
-----------------------------------------------`);
    });
});

// Adding values to the tables
db.run("INSERT INTO status (description) VALUES ('not started')");
db.run("INSERT INTO status (description) VALUES ('in progress')");
db.run("INSERT INTO status (description) VALUES ('in testing')");
db.run("INSERT INTO status (description) VALUES ('done')");

db.run("INSERT INTO departments (description) VALUES ('Approvals')");
db.run("INSERT INTO departments (description) VALUES ('Prod')");
db.run("INSERT INTO departments (description) VALUES ('QA')");
db.run("INSERT INTO departments (description) VALUES ('DevOps')");

db.run("INSERT INTO users (first_name, last_name) VALUES ('Andrei', 'Test')");
db.run("INSERT INTO users (first_name, last_name) VALUES ('Ioana', 'Test')");
db.run("INSERT INTO users (first_name, last_name) VALUES ('Bogdan', 'Test')");
db.run("INSERT INTO users (first_name, last_name) VALUES ('Adina', 'Test')");
db.run("INSERT INTO users (first_name, last_name) VALUES ('Carmen', 'Test')");

db.run("INSERT INTO tasks (due_date, user_id, status_id, title, details) VALUES ('01/01/1970',1,1, 'task 1','task 1 deals with the following details')");
db.run("INSERT INTO tasks (due_date, user_id, status_id, title, details) VALUES ('01/01/1970' ,2,2, 'task 2','task 2 deals with the following details')");
db.run("INSERT INTO tasks (due_date, user_id, status_id, title, details) VALUES ('01/01/1970' ,3,3, 'task 3','task 3 deals with the following details')");
db.run("INSERT INTO tasks (due_date, user_id, status_id, title, details) VALUES ('01/01/1970' ,4,4, 'task 4','task 4 deals with the following details')");
db.run("INSERT INTO tasks (due_date, user_id, status_id, title, details) VALUES ('01/01/1970' ,5,3, 'task 5','task 5 deals with the following details')");
db.run("INSERT INTO tasks (due_date, status_id, title, details) VALUES ('01/01/1970',3, 'task 6','task 6 deals with the following details')");
db.run("INSERT INTO tasks (due_date, user_id, title, details) VALUES ('01/01/1970',3, 'task 7','task 7 deals with the following details')");
  
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (1,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (2,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (3,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (4,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (5,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (6,1)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (6,2)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (6,4)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (7,3)");
db.run("INSERT INTO task_department_assign (task_id, department_id) VALUES (7,4)");

db.close();


