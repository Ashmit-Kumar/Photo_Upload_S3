const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },  // S3 URL of the image
  filename: { type: String, required: true },  // S3 file name (e.g., 'images/1647837288-photo.jpg')
  uploadedAt: { type: Date, default: Date.now },  // Timestamp of upload
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
