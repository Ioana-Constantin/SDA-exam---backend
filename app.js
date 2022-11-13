var express = require('express');
var bodyParser = require('body-parser');
const port = 8000;
const tasksService = require('./services/tasks');
const usersService = require('./services/users');
const departmentsService = require('./services/departments');

var app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// ---------------TASKS ROUTES-----------------------
app.get('/all-tasks', async (req, res) => {
    const tasks = await tasksService.getAllTasks();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(tasks));
})

app.get('/tasks/:taskId', async (req, res) => {
    const tasks = await tasksService.getTaskById(req.params.taskId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(tasks));
})

app.post('/tasks', async (req, res) => {
    const task = await tasksService.createNewTask(req.body);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
})

app.put('/tasks/:taskId', async (req, res) => {
    const task = await tasksService.updateTask(req.body, req.params.taskId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
})

app.delete('/tasks/:taskId', async (req, res) => {
    const task = await tasksService.deleteTask(req.params.taskId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
})

// ---------------USERS ROUTES-----------------------
app.get('/all-users', async (req, res) => {
    const users = await usersService.getAllUsers();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(users));
})

app.post('/users', async (req, res) => {
    const user = await usersService.createNewUser(req.body);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(user));
})

app.put('/users/:userId', async (req, res) => {
    const task = await usersService.updateUser(req.body, req.params.userId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
})

app.delete('/users/:userId', async (req, res) => {
    const task = await usersService.deleteUser(req.params.userId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(task));
})

// ---------------DEPARTMENT ROUTES-----------------------
app.get('/all-departments', async (req, res) => {
    const departments = await departmentsService.getAllDepartments();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(departments));
})

app.post('/departments', async (req, res) => {
    const department = await departmentsService.createNewDepartment(req.body);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(department));
})

app.put('/departments/:departmentId', async (req, res) => {
    const department = await departmentsService.updateDepartment(req.body, req.params.departmentId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(department));
})

app.delete('/departments/:departmentId', async (req, res) => {
    const department = await departmentsService.deleteDepartment(req.params.departmentId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(department));
})

// ---------------DEPARTMENT ASSIGN ROUTE-----------------------

app.post('/departments-assign/:taskId', async (req, res) => {
    await departmentsService.deleteDepartmentsFromTask(req.params.taskId);
    const departments = await departmentsService.assignDepartmentsToTask(req.body.departmentIds, req.params.taskId);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify({ok: true}));
})

app.listen(port, () => {
    console.log(`Ioana SDA BE app listening on port ${port}`)
})
