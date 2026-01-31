const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const StudyMaterial = require('../models/StudyMaterial');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads/');
        // Ensure directory exists or handle via fs (omitted for brevity, assuming folder created or auto-handled)
        // Actually, good practice to let user know to create folder or use fs.mkdirSync
        const fs = require('fs');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// GET /api/materials/approved - Get all approved materials (Student View)
router.get('/approved', async (req, res) => {
    try {
        const materials = await StudyMaterial.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/materials/pending - Get all pending materials (Admin View)
router.get('/pending', async (req, res) => {
    try {
        const materials = await StudyMaterial.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/materials - Upload/Create new material
// supports multipart/form-data for file uploads
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { title, subject, type, url, author } = req.body;

        let filePath = null;
        if (req.file) {
            // Store relative path for frontend access
            filePath = `/uploads/${req.file.filename}`;
        }

        const newMaterial = new StudyMaterial({
            title,
            subject,
            type,
            url: url || '', // Optional if file provided
            filePath: filePath,
            author: author || 'Student',
            status: 'pending' // Default status
        });

        const savedMaterial = await newMaterial.save();
        res.status(201).json(savedMaterial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH /api/materials/:id/status - Approve or Reject material
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const material = await StudyMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: 'Material not found' });
        }

        material.status = status;
        const updatedMaterial = await material.save();
        res.json(updatedMaterial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
