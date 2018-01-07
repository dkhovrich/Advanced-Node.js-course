const util = require('util');
const fs = require('fs');
const server = require('http').createServer();

const readFile = util.promisify(fs.readFile);
const requestData = { 'name': 'Peter' };

server.on('request', async (req, res) => {
    switch (req.url) {
    case '/api':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(requestData));
        break;
    case '/home':
    case '/about':
        res.writeHead(200, { 'Content-type': 'text/html' });
        const data = await readFile(`.${req.url}.html`);
        res.end(data);
        break;
    case '/':
        res.writeHead(301, { 'Location': '/home' });
        res.end();
        break;
    default:
        res.writeHead(404);
        res.end();
    break;
    }
});

server.listen(8000);