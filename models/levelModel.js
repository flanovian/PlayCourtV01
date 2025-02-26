const { types } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const levelSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    submittedAt: Date,  // Tanggal pengajuan
    status: ['Pending', 'Approved', 'Rejected'],  // Status pengajuan: Pending, Approved, Rejected
    level: String,  // Level yang diminta (e.g. Beginner, Intermediate, Advanced)
    levelReview: String,  // Level setelah review (e.g. Intermediate, Advanced)
    reviewedAt: Date,  // Tanggal review dilakukan
    commentsPlayer: String,
    commentsReview: String,  // Komentar admin terkait pengajuan
    age: Number,
    experience: Number,
    playstyle: String,  // Gaya bermain: Aggressive, Defensive, Balanced
    rating: String // Rating yang ada (jika ada)
   

})

module.exports = mongoose.model('Level', levelSchema)