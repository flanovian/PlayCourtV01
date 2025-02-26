const MyLevel = require('../models/levelModel')
const moment = require('moment');
const UserLevel = require('../models/userLevel')

moment.locale('id');  // Set locale ke Indonesia

module.exports.index = async (req, res) => {
    try {
        const userId = req.user._id;
        const mylevel = await UserLevel.find({user_id: userId}).populate("level_id");

        // Format URL untuk video
        // mylevel.forEach(item => {
        //     if (item.matchVideo) {
        //         item.matchVideo.url = `http://${req.get('host')}/videos/${item.matchVideo.filename}`;
        //     }
        // });
     
        res.render('mylevel/index', { mylevel });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


module.exports.store = async (req, res, next) => {     
    try {
        const userId = req.user._id;

        // 1️⃣ Cek apakah user sudah ada di userLevel
        let userLevel = await UserLevel.findOne({ user_id: userId });

        if (!userLevel) {
            // Jika belum ada, buat entry baru dengan level_id sebagai array
            userLevel = new UserLevel({
                user_id: userId,
                level_id: [],  // Harus array
                level: '',
                matchVideo: {
                    url: req.file.path,
                    filename: req.file.filename
                }
            });
            await userLevel.save();
        }

        // 2️⃣ Simpan MyLevel
        const today = new Date().toLocaleDateString('id-ID');
        const newLevel = new MyLevel({
            user_id: userId,
            level: req.body.level, 
            age : req.body.age,
            experience : req.body.experience,
            playstyle : req.body.playstyle,
            rating : req.body.rating,
            status: 'Pending',
            submittedAt: today
        });
        await newLevel.save();

        // 3️⃣ Update userLevel:
        userLevel.matchVideo = {
            url: req.file.path,
            filename: req.file.filename
        };
        userLevel.submittedEnd = today
        userLevel.statusReview = 'Pending'

        userLevel.level_id.push(newLevel._id); // Tambahkan myLevel ke array level_id
        await userLevel.save();

        req.flash('success_msg', 'Pengajuan Level Berhasil dikirim');
        res.redirect('/mylevel');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Terjadi kesalahan saat menyimpan data');
        res.redirect('/mylevel');
    }
};

