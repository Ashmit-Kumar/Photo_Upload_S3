const AWS = require('aws-sdk');
const Image = require('../models/image');

// Generate a presigned URL for image upload to S3
exports.generatePresignedUrl = async (req, res) => {
  const s3 = new AWS.S3();
  const { fileName, fileType } = req.body;

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `images/${Date.now()}-${fileName}`,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ presignedUrl });
  } catch (err) {
    console.error('Error generating presigned URL:', err);
    res.status(500).json({ message: 'Error generating presigned URL' });
  }
};

// Save image metadata to MongoDB
exports.saveImageUrl = async (req, res) => {
  const { url, filename } = req.body;

  try {
    const newImage = new Image({ url, filename });
    await newImage.save();
    res.status(201).json({ message: 'Image metadata saved successfully!' });
  } catch (err) {
    console.error('Error saving image metadata:', err);
    res.status(500).json({ message: 'Error saving image metadata' });
  }
};

// Fetch all images from MongoDB
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Error fetching images' });
  }
};
