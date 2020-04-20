const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.end('Основы nodejs');

});

server.listen(3000, '127.0.0.1 ')