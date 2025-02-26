const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Nama sponsor
  logo: { type: String, required: true }, // URL/path logo sponsor
  website: { type: String }, // Website sponsor (opsional)
  sponsorshipType: { type: String, enum: ['Gold', 'Silver', 'Bronze'], required: true }, // Jenis sponsorship
  contactEmail: { type: String, required: true }, // Email kontak sponsor
  isActive: { type: Boolean, default: true } // Status apakah sponsor masih aktif
}, { timestamps: true });

module.exports = mongoose.model('Mst_sponsor', SponsorSchema)