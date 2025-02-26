const { types } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userLevelSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level_id: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Level'
    }],
    level:String,    
    matchVideo:  // URL video pertandingan yang di-upload
    {
        url: String,
        filename: String
    },
    submittedEnd:Date,
    statusReview: String

})

module.exports = mongoose.model('userLevel', userLevelSchema)