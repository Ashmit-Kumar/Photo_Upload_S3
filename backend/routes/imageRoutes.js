const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route to generate presigned URL
router.post('/generate-presigned-url', imageController.generatePresignedUrl);

// Route to save image URL in MongoDB after upload
router.post('/save-image', imageController.saveImageUrl);

module.exports = router;
