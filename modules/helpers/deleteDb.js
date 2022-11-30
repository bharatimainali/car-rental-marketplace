const fs = require('fs');

const path = './prisma/leiebil-dev.db';

try {
    console.log('Removing file ' + path + '...');

    fs.rm(path, { recursive: true }, (err) => {
        if (err && err.code === 'ENOENT') {
            return console.log(
                'File ' + path + ' is already removed / does not exist.'
            );
        }
    });
} catch (err) {
    console.log('Error removing file ' + path + ', exiting...');
    console.error(err);
    process.exit(1);
}
