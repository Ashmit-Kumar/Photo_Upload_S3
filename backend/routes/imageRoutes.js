const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/generate-presigned-url', imageController.generatePresignedUrl);
router.post('/save-image', imageController.saveImageUrl);
router.get('/images', imageController.getAllImages);

module.exports = router;
