const express = require('express');
const Datastore = require('nedb');
const ip = '194.67.92.127';
const port = 80;
const http = require('http');
const https = require('https');
const fs = require('fs');
const privateKey   = fs.readFileSync('/etc/ssl/martyanovandrey.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/martyanovandrey.crt', 'utf8');

const options = {key: privateKey, cert: certificate};

const app = express();
const server = https.createServer(options, app);

server.listen(port, ip, () => console.log("Listening to "+ip+":"+port));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

//httpServer.listen(8080);
//httpsServer.listen(8443);