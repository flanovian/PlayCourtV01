const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ErrorHandler = require('./utils/ErrorHandler')
const fs = require("fs");
const favicon = require('serve-favicon');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// login
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const isAuth = require('./middlewares/isAuth');

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallback=process.env.GOOGLE_CALLBACK_URL;

const mongoURI = process.env.MONGO_URI || 
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}${process.env.MONGO_OPTIONS}`;


mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
    });


// Template engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret : 'this-is-a-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
}))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(flash());
// login
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));

//login manual
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false, { message: 'Email tidak terdaftar.' });

        if (!user.password) return done(null, false, { message: 'Gunakan login dengan Google.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Password salah.' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallback
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // console.log("User ditemukan, langsung login:", user);
            return done(null, user); // User langsung login
        } else {
            // console.log("User belum terdaftar, harus mengisi form registrasi.");

            // Simpan data sementara di sesi
            return done(null, { 
                fullname: profile.displayName,
                email: profile.emails[0].value,
                profilePic: [{ url: profile.photos[0].value, filename: "google_profile_pic" }],
                googleId: profile.id, 
                userType: 2
            });
        }
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // console.log("Deserializing user:", user);
    done(null, user);
});




app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.url = req.originalUrl;
    res.locals.success_msg = req.flash('success_msg');    
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// HomePage
// app.get('/', isAuth, (req, res) => {
//     res.render('home')
// })

// HomePage
app.get('/', isAuth, (req, res) => {
    res.render('home', {
        success_msg: req.flash('success'),
        error_msg: req.flash('error')
    });
});


app.get("/video", function (req, res) {
    const videoPath = path.join(__dirname, "public/videos", "1738664933351.mp4");

    let videoSize;
    try {
        videoSize = fs.statSync(videoPath).size;
    } catch (err) {
        console.error("File tidak ditemukan:", err.message);
        return res.status(404).send("Video tidak ditemukan");
    }

    const range = req.headers.range;
    if (!range) {
        // Jika tidak ada range, kirim seluruh video
        const headers = {
            "Content-Length": videoSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
        return;
    }

    // Parsing range untuk streaming
    const CHUNK_SIZE = 5 * 10 ** 5; // ~500 KB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});
  




app.use('/', require('./routes/auth'))
// app.use('/places', require('./routes/places'))
app.use('/tournaments', require('./routes/tournamentsRoute'));
app.use('/mylevel', require('./routes/myLevelRoute'));
app.use('/players', require('./routes/playersRoute'));

app.use('/levels', require('./routes/levelsRoute'));

app.use('/sponsor', require('./routes/sponsorRoute'));
app.use('/levelup', require('./routes/levelupRouter'));
// app.use('/places/:place_id/reviews', require('./routes/review'))

app.all('*', (req, res, next) => {  
    next(new ErrorHandler('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong'
    res.status(statusCode).render('error', {err})
})
//running apps
app.listen(3000, () => {
    console.log(`server is running http://localhost:3000`)
})
