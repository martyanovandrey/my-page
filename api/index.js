const https = require("https"),
  fs = require("fs"),
  http = require('http'),
  express = require('express'),
  helmet = require("helmet");
const ip = '194.67.92.127';
const options = {
  key: fs.readFileSync('/etc/ssl/martyanovandrey.key', 'utf8'),
  cert: fs.readFileSync('/etc/ssl/martyanovandrey.crt', 'utf8')
};
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});
https.createServer(options, app).listen(443, ip, () => {
  console.log('HTTPS Server running on port 443');
});

app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));

app.use(helmet()); // Add Helmet as a middleware

//database
const Datastore = require('nedb');
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