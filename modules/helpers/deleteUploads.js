const fs = require('fs');

const path = './uploads/vehicleImages';

try {
    console.log('Removing directory and files in ' + path + '...');

    fs.rm(path, { recursive: true }, (err) => {
        if (err && err.code === 'ENOENT') {
            return console.log(
                'Directory and files in ' +
                    path +
                    ' is already removed / does not exist.'
            );
        }
    });
} catch (err) {
    console.log(
        'Error removing directory or files in ' + path + ', exiting...'
    );
    console.error(err);
    process.exit(1);
}
