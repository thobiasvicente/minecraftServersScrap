const multer = require('multer');
const path = require('path');
const crypto= require('crypto');

const filePath = path.resolve(__dirname, '..', '..', 'uploads/resizes');


module.exports = {
    dest: filePath,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, filePath)
        }, 
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
};