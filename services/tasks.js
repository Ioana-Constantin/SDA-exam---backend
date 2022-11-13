const { dbAll, dbRunInsert, dbRunUpdate, dbRunDelete, dbEach } = require('../db/utils');

let map = [];

const departmentMappings = async () => {
    let sql =`
        SELECT * FROM departments`;
    map = await dbAll(sql);
}

(async function() {
	await departmentMappings();
})();


const getDeptNames = (depts) => {
    let deptsArr = [];
    if(depts && depts.length){

        depts.split(',').map(el => {
            let id = map.filter(m => m.id == el);
            deptsArr.push(id[0]?.description)
        });
    }
    return deptsArr;
}

const getAllTasks =  async () => {
    let sql =`
        SELECT 
            t.id, 
            t.title, 
            t.details,
            t.due_date AS dueDate,
            u.first_name AS assignee,
            u.id AS userId,
            s.description AS status,
            s.id AS statusId,
            (SELECT GROUP_CONCAT(department_id)
                FROM task_department_assign d 
                WHERE d.task_id = t.id) AS department
        FROM tasks t
        LEFT JOIN status s ON t.status_id = s.id
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.id`;
    const res = await dbAll(sql);
    res.forEach(element => {
        department = getDeptNames(element.department)
        element.department = department;
    });

    return res;
}

//ok
const createNewTask = async (task) => {
    const sql = `INSERT INTO tasks (user_id, status_id, title, details, due_date) VALUES (?, ?, ?, ?, ?)`
    const values = [task.userId || null, task.statusId || null, task.title || null , task.details || null, task.dueDate || "01/01/1970" ]
    const newTaskId = await dbRunInsert(sql, values);
    console.log(`New task was created, id :: ${newTaskId}`);
    return await getTaskById(newTaskId);
}

// ok
const deleteTask = async (taskId) => {
    const sql = `DELETE FROM tasks WHERE id = (?)`
    return dbRunDelete(sql, taskId);
}

// ok
const updateTask = async (task, taskId) => {
    let updatedFields = '';
    let values = [];

    if (task.userId){
        updatedFields += 'user_id = (?),';
        values.push(task.userId);
    }

    if (task.statusId){
        updatedFields += 'status_id = (?),';
        values.push(task.statusId);
    }

    if (task.title){
        updatedFields += 'title = (?),';
        values.push(task.title);
    }

    if (task.details){
        updatedFields += 'details = (?),';
        values.push(task.details);
    }

    if (task.dueDate){
        updatedFields += 'due_date = (?),';
        values.push(task.dueDate);
    }

    const sql = `UPDATE tasks SET ${updatedFields.slice(0,-1)} WHERE id = (?)`
    values.push(taskId);
    return dbRunUpdate(sql, values);
}

// ok
const getTaskById = async (taskId) => {
    const sql = `SELECT * FROM tasks WHERE id = (?)`
    return dbEach(sql, taskId);
}

// const test =  async () => {
//     let task = {

//                 title: "updated title"
//             }
//     const res = await getTaskById( 11);
//     console.log('RESSS', res);
//     // const res = await updateTask(task, 11);
//     // console.log('test status', res);
//     // return res;
// }

// (async function() {

// 	await test();
//     // let tasks = await getAllTasks();
//     // console.log('------------', tasks)
// })();

// const test2 =  async () => {
//     let task = {
//         user_id: 5,
//         status_id: 3, 
//         details: "asdasdasdasdsasadsa"
//     }
//     const res = await createNewTask(task);
//     console.log('test status', res);
//     // return res;
// }

// (async function() {
// 	await test2();
//     // await getAllTasks();
// })();

exports.getAllTasks = getAllTasks;
exports.createNewTask = createNewTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.getTaskById = getTaskById;