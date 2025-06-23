require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://kishan.x02.me',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(express.json());
app.use(express.static('/home/kishanx08/img-hosting'));

// Authentication middleware
const authenticate = (req, res, next) => {
  const secretKey = req.headers['authorization'];
  
  if (!secretKey || secretKey !== process.env.UPLOAD_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Use local storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    // Use timestamp + original name for uniqueness
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.post('/upload', authenticate, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No image file provided');
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Log the uploaded file info
    console.log('Image uploaded:', req.file);

    // Generate image URL using custom domain or server address
    const baseUrl = process.env.BASE_URL || `http://kishan.x02.me:${port}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
