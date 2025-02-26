const { types } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Level = require('./level')

const tournamentSchema = new Schema({
    name :String,
    category : String, //single, double, team
    sportCategory:String, //sepakbola, tenis
    price: Number,
    location : String,
    maxPlayer : Number,
    setPlay : Number,
    startRegister: Date,
    endRegister: Date,       
    startMatch : Date,
    endMatch : Date,
    finalDate : Date,
    status : String, //open or close 
    images : String,
    author : String,
    maxLevel : String, //beginner, Elite, newbe
    description : String

    // images: [
    //     {
    //         url: String,
    //         filename: String
    //     }
    // ],
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // 
    // maxLevel:[{
    //     type : Schema.Types.ObjectId,
    //     ref: 'Level'
    // }],
    // player reference
})

// tournamentSchema.post('findOneAndDelete', async function(doc){
//     if (doc) {
//         await Review.deleteMany({_id: {$in : doc.maxLevel}})
//     }
// })

module.exports = mongoose.model('Tournament', tournamentSchema)