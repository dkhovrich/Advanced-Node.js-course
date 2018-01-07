const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require('stream');
const crypto = require('crypto');
const file = process.argv[2];

const progress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk);
    }
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    //.on('data', () => process.stdout.write('.'))
    .pipe(crypto.createCipher('aes192', 'a_secret'))
    .pipe(progress)
    .pipe(fs.createWriteStream(file + '.zz'))
    .on('finish', () => console.log('Done'));