const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const app = express();
const cors=require('cors')
require('dotenv').config();

// Middleware to parse JSON and handle large files
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed
app.use(cors());
// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

// Upload endpoint
app.post('/upload', async (req, res) => {
    const { fileName, fileType, fileContent } = req.body;

    if (!fileName || !fileType || !fileContent) {
        return res.status(400).send({ error: 'Missing required fields.' });
    }

    // Decode base64 content
    const buffer = Buffer.from(fileContent, 'base64');

    // Upload parameters
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${fileName}`,
        Body: buffer,
        ContentType: fileType,
        ACL: 'public-read', // Optional: Make the file publicly accessible
    };

    try {
        const data = await s3.upload(params).promise();
        res.send({ imageUrl: data.Location });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).send({ error: 'Failed to upload image.' });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
