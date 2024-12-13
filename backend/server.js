const express = require('express');
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS options
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'], // Allow both GET and POST methods
  allowedHeaders: ['Content-Type'], // Allowed headers for the requests
};
app.use(cors(corsOptions));

// Middleware to handle file uploads (no need to use fileUpload for this scenario)
app.use(fileUpload());

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

// Upload endpoint
app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }

    const file = req.files.image;

    // Upload to S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}_${file.name}`,
      Body: file.data,
      ContentType: file.mimetype,
    };

    try {
        const uploadResult = await s3.upload(params).promise();
        res.send({ imageUrl: uploadResult.Location });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).send({ error: 'Failed to upload image.' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
