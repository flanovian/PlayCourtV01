const multer = require('multer');
const path = require('path');
const ErrorHandler = require('../utils/ErrorHandler');

// Set up the destination and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos'); // Tentukan folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Penamaan file dengan waktu dan ekstensi asli
    }
});
// File filter untuk validasi
const fileFilter = (req, file, cb) => {
    // Validasi file video
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi']; // Tipe MIME yang diizinkan
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Hanya file video yang diperbolehkan!'), false); // Jika bukan file video
    }
    cb(null, true); // Jika file valid
};

// Multer upload configuration dengan validasi ukuran file
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Batasi ukuran file
    fileFilter: fileFilter
});

module.exports = upload