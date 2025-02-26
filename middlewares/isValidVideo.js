const multer = require('multer');

function handleMulterError(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            // Jika file melebihi batas ukuran
            req.flash('error_msg', 'File terlalu besar. Ukuran file harus lebih kecil dari 50 MB');
        } else {
            // Jika ada error lain dari Multer
            req.flash('error_msg', 'Terjadi kesalahan saat meng-upload file.');
        }
    } else if (err) {
        // Jika error bukan berasal dari Multer
        req.flash('error_msg', err.message || 'Terjadi kesalahan yang tidak diketahui.');
    }
    res.redirect('/mylevel'); // Kembali ke halaman pengajuan
}

module.exports = handleMulterError;