const http = require('http');

const req = http.get('http://www.google.com', res => {
    console.log(res.statusCode);
    console.log(res.headers);

    res.on('data', data => {
        console.log(data.toString());
    });
});

req.on('error', err => console.error(err));