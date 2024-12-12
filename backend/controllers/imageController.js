const AWS = require('aws-sdk');
const Image = require('../models/image');

// Generate a presigned URL for uploading directly to S3
exports.generatePresignedUrl = async (req, res) => {
  const s3 = new AWS.S3();
  const { fileName, fileType } = req.body;

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,  // Your S3 Bucket Name
    Key: `images/${Date.now()}-${fileName}`,  // Unique filename for the uploaded file
    Expires: 60,  // URL expiration time in seconds
    ContentType: fileType,  // MIME type of the file
    ACL: 'public-read',  // Makes the file publicly accessible
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ presignedUrl });
  } catch (err) {
    console.error('Error generating presigned URL:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Store the image URL in MongoDB after upload
exports.saveImageUrl = async (req, res) => {
  const { url, filename } = req.body;
  try {
    const newImage = new Image({ url, filename });
    await newImage.save();
    res.status(201).json({ message: 'Image saved successfully!' });
  } catch (err) {
    console.error('Error saving image metadata:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
