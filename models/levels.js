const mongoose = require('mongoose');

const LevelsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  minPoints: { type: Number, required: true },
  maxPoints: { type: Number, required: true },
  badgeImage: { type: String, required: true },
  sportCategory : {type: String},
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('Mst_Levels', LevelsSchema)
