const { db_all } = require('../db/utils');

let map = [];

const departmentMappings = async () => {
    let sql =`
        SELECT * FROM departments`;
    map = await db_all(sql);
}

(async function() {
	await departmentMappings();
})();


const getDeptNames = (depts) => {
    let deptsArr = [];
    depts.split(',').map(el => {
        let id = map.filter(m => m.id == el);
        deptsArr.push(id[0]?.description)
    });
    return deptsArr;
}

const getAllTasks =  async () => {
    let sql =`
        SELECT 
            t.id, 
            t.title, 
            t.details, 
            u.first_name AS assignee, 
            s.description AS status,
            (SELECT GROUP_CONCAT(department_id) 
                FROM task_department_assign d 
                WHERE d.task_id = t.id) AS department
        FROM tasks t
        LEFT JOIN status s ON t.status_id = s.id
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.id`;
    const res = await db_all(sql);
    res.forEach(element => {
        department = getDeptNames(element.department)
        element.department = department;
    });

    return res;
}

// const test =  async () => {
//     let sql =`
//         SELECT * FROM tasks`;
//     const res = await db_all(sql);
//     console.log('test status', res);
//     // return res;
// }

// (async function() {
// 	await test();
//     // await getAllTasks();
// })();

exports.getAllTasks = getAllTasks;