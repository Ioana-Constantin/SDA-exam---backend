const { dbAll, dbRunInsert, dbRunUpdate, dbRunDelete, dbEach } = require('../db/utils');

const getAllUsers =  async () => {
    let sql =`
        SELECT *
        FROM users
        ORDER BY id`;
    const res = await dbAll(sql);

    return res;
}

//ok
const createNewUser = async (user) => {
    const sql = `INSERT INTO users (first_name, last_name) VALUES (?, ?)`
    const values = [user.firstName || null, user.lastName || null]
    const newUserId = await dbRunInsert(sql, values);
    console.log(`New user was created, id :: ${newUserId}`);
    return await getUserById(newUserId);
}

// ok
const deleteUser = async (userId) => {
    const sql = `DELETE FROM users WHERE id = (?)`
    return dbRunDelete(sql, userId);
}

// ok
const updateUser = async (user, userId) => {
    let updatedFields = '';
    let values = [];

    if (user.firstName){
        updatedFields += 'first_name = (?),';
        values.push(user.firstName);
    }

    if (user.lastName){
        updatedFields += 'last_name = (?),';
        values.push(user.lastName);
    }

    const sql = `UPDATE users SET ${updatedFields.slice(0,-1)} WHERE id = (?)`
    values.push(userId);
    return dbRunUpdate(sql, values);
}

// ok
const getUserById = async (userId) => {
    const sql = `SELECT * FROM users WHERE id = (?)`
    return dbEach(sql, userId);
}

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;