const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/all-tasks', (req, res) => {
    const dbMock = fs.readFileSync(__dirname + '/db-mock.json', { encoding: 'utf8', flag: 'r' })
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('content-type', 'application/json');
    res.status(200).send(JSON.parse(dbMock));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})