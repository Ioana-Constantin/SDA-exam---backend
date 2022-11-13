const { dbAll, dbRunInsert, dbRunUpdate, dbRunDelete, dbEach } = require('../db/utils');

const getAllDepartments =  async () => {
    let sql =`
        SELECT *
        FROM departments
        ORDER BY id`;
    const res = await dbAll(sql, []);

    return res;
}

//ok
const createNewDepartment = async (department) => {
    const sql = `INSERT INTO departments (description, color) VALUES (?, ?)`
    const values = [department.description || '', department.color || '#BA55D3']
    const newDepartmentId = await dbRunInsert(sql, values);
    return await getDepartmentById(newDepartmentId);
}

// ok
const deleteDepartment = async (departmentId) => {
    const sql = `DELETE FROM departments WHERE id = (?)`
    return dbRunDelete(sql, departmentId);
}

// ok
const updateDepartment = async (department, departmentId) => {
    let updatedFields = '';
    let values = [];

    if (department.description){
        updatedFields += 'description = (?),';
        values.push(department.description);
    }

    
    if (department.color){
        updatedFields += 'color = (?),';
        values.push(department.color);
    }


    const sql = `UPDATE departments SET ${updatedFields.slice(0,-1)} WHERE id = (?)`
    values.push(departmentId);
    return dbRunUpdate(sql, values);
}

// ok
const getDepartmentById = async (departmentId) => {
    const sql = `SELECT * FROM departments WHERE id = (?)`
    return dbEach(sql, departmentId);
}

const deleteDepartmentsFromTask = async (taskId) => {
    const sql = `DELETE FROM task_department_assign WHERE task_id = (?)`
    return dbRunDelete(sql, taskId);
}

const assignDepartmentsToTask = async (departments, taskId) => {
    const res = await Promise.all(departments.map(department => {
        let sql = `INSERT INTO task_department_assign (task_id, department_id) VALUES (? , ?)`
        dbRunInsert(sql, [taskId, department]);
    }) )
    return res;
}

exports.getAllDepartments = getAllDepartments;
exports.createNewDepartment = createNewDepartment;
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;
exports.deleteDepartmentsFromTask = deleteDepartmentsFromTask;
exports.assignDepartmentsToTask = assignDepartmentsToTask;