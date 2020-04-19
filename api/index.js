const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('datadase.db');
database.loadDatabase();

app.get('/api', (request, responce) => {
    database.find({}, (err, data) => {
        if (err) {
            responce.end();
            return;
        }
        responce.json(data);
    });
});

app.post('/api', (request, responce) => {
    console.log('I got a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    responce.json(data);
});