const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;
const tasksService = require('./services/tasks');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/all-tasks', async (req, res) => {
    const tasks = await tasksService.getAllTasks();
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.stringify(tasks));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})