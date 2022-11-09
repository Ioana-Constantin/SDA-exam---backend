const { dbAll, dbRunInsert, dbRunUpdate, dbRunDelete, dbEach } = require('../db/utils');

const getAllDepartments =  async () => {
    let sql =`
        SELECT *
        FROM departments
        ORDER BY id`;
    const res = await dbAll(sql);

    return res;
}

//ok
const createNewDepartment = async (department) => {
    const sql = `INSERT INTO departments (description) VALUES (?)`
    const values = [department.description || null]
    const newDepartmentId = await dbRunInsert(sql, values);
    console.log(`New department was created, id :: ${newDepartmentId}`);
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

    const sql = `UPDATE departments SET ${updatedFields.slice(0,-1)} WHERE id = (?)`
    values.push(departmentId);
    return dbRunUpdate(sql, values);
}

// ok
const getDepartmentById = async (departmentId) => {
    const sql = `SELECT * FROM departments WHERE id = (?)`
    return dbEach(sql, departmentId);
}

exports.getAllDepartments = getAllDepartments;
exports.createNewDepartment = createNewDepartment;
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;