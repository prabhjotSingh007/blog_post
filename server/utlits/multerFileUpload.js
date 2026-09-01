const multer = require('multer');
const path = require('path');
const fs = require('fs');

let uploadDir;




// 2. Optional: Filter File Types (e.g., Images and Videos only)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and MP4/MOV videos are allowed.'), false); // Reject file
    }
};



const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
module.exports = {
    upload
};



