const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: false
    },
    playArea: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false
    },
    userType: {
        type: Number,
    },
    email: { type: String, required: true, unique: true },
    instagram: {
        type: String,
        default: null
    },
    password: String,
    loginMethod: { type: String, enum: ['manual', 'google'], required: true },
    // profilePic: [
    //     {
    //         url: String,
    //         filename: String
    //     }
    // ],
    googleId: { // Menyimpan ID Google user jika login dengan Google
        type: String,
        unique: true,
        sparse: true // Memungkinkan kolom ini kosong jika user daftar dengan email & password
    }
});

// const UserSchema = new mongoose.Schema({
//     fullname: String,
//     email: { type: String, required: true, unique: true },
//     password: String, // Bisa null jika login dengan Google
//     loginMethod: { type: String, enum: ['manual', 'google'], required: true }
// });


// Gunakan usernameField "email" agar login dengan email
// userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model('User', userSchema);
