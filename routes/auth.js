const express = require('express');
const passport = require('passport');
const wrapAsync = require('../utils/warpAsync');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 


const AuthController = require('../controller/auth');
// const upload = require('../config/multer');

// Middleware untuk menyimpan URL sebelum login
function saveRedirectUrl(req, res, next) {
    if (req.session) {
        req.session.returnTo = req.originalUrl; // Simpan halaman sebelum login
    }
    next();
}

// REGISTRASI**
router.get('/register', (req, res) => {
    // console.log("Ke sini")
    const user = req.session.tempUser || null;
   
    // Hapus session sebelum merender halaman
    req.session.tempUser = null;
    delete req.session.tempUser;

    res.render('auth/register', {
        user,
        successMessage: req.flash('success') || "",
        errorMessage: req.flash('error') || ""
    });
});


// Register manual
router.post('/register', async (req, res) => {
    
    try {
        const { fullname, phone, playArea, gender, email, instagram, password } = req.body;
       
        let user = await User.findOne({ email });

        if (user) {
            req.flash('error', 'Email sudah terdaftar.');
            return res.redirect('/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            fullname,
            phone, 
            playArea, 
            gender, 
            instagram,
            email,
            password: hashedPassword,
            loginMethod: 'manual',
            userType: 2 // Misal 2 adalah user biasa
        });

        await user.save();

        // ✅ Simpan user ke session dalam bentuk objek biasa (hindari referensi Mongoose)
        req.session.currentUser = user.toObject(); 

        // Jika menggunakan Passport.js, login otomatis
        if (req.login) {
            req.login(user, (err) => {
                if (err) {
                    // console.log(err);
                    req.flash('error', 'Gagal login otomatis setelah registrasi.');
                    return res.redirect('/login');
                }
                req.flash('success', 'Registrasi berhasil. Anda Sudah Login.');
                res.redirect('/');
            });
        } else {
            req.flash('success', 'Registrasi berhasil. Anda Sudah Login.');
            res.redirect('/');
        }
    } catch (err) {
        // console.log(err);
        if (err.code === 11000) {
            req.flash('error', 'Email sudah terdaftar.'); // Kirim error duplicate key
        } else {
            req.flash('error', 'Terjadi kesalahan saat registrasi.');
        }
        res.redirect('/register');
    }
});



// LOGIN DENGAN EMAIL & PASSWORD**
router.route('/login')
    .get(AuthController.loginForm)
    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true // Tampilkan pesan error jika gagal
    }), AuthController.login);

// LOGIN DENGAN GOOGLE**
router.get('/auth/google', saveRedirectUrl, 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// CALLBACK GOOGLE AUTH**
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), 
    (req, res) => {
        // console.log("Google callback berhasil. User:", req.user);
        
       
        if (!req.user || !req.user._id) {
            // console.log("User belum terdaftar, menyimpan data sementara ke session.");
            
            req.session.tempUser = req.user;
            return res.redirect('/register');
            
        }
        // Ambil URL yang dituju sebelum login (jika ada)
        const redirectUrl = req.session.returnTo || '/';
        delete req.session.returnTo; // Hapus session setelah digunakan

        // console.log("User sudah terdaftar, redirect ke:", redirectUrl);
        res.redirect(redirectUrl);
    }
);


// Register via Google (Google Callback)
// router.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }), 
//     async (req, res) => {
//         console.log(req.user)
//         try {
//             let user = await User.findOne({ email: req.user.email });

//             if (!user) {
                
//                 req.session.tempUser = req.user;
//                 return res.redirect('/register');
//                 // await user.save();
//             }

//             req.login(user, (err) => {
//                 if (err) return next(err);
//                 res.redirect('/');
//             });
//         } catch (err) {
//             console.error(err);
//             res.redirect('/login');
//         }
//     }
// );

// LOGOUT**
router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => { // Hapus sesi setelah logout
            res.redirect('/');
        });
    });
});

module.exports = router;
