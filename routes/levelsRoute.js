const express = require('express');
const wrapAsync = require('../utils/warpAsync') //biar error keliatan
// schema
const isAuth = require('../middlewares/isAuth');
const upload = require('../config/multer');

// Controller
const levelsController = require('../controller/levelsController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/')
    .get(isAuth, wrapAsync(levelsController.index))
    .post(isAuth, wrapAsync(levelsController.store))

// router.post('/create', async (req, res) => {
//     try {
//         const { name, sportCategory, minPoints, maxPoints, badgeImage, isActive } = req.body;
//         console.log(req.body)
//         // Buat objek level baru
//         const newLevel = new Level({
//             name,
//             sportCategory,
//             minPoints,
//             maxPoints,
//             badgeImage,
//             isActive: isActive === 'true' // Konversi string ke boolean
//         });

//         // Simpan ke database
//         await newLevel.save();

//         // Redirect atau kirim respons
//         res.redirect('/levels'); // Redirect ke halaman daftar level
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Terjadi kesalahan saat menambahkan level.');
//     }
// });

module.exports = router;