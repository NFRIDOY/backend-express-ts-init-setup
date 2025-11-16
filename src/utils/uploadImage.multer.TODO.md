A complete and enhanced version of `multer` setup that includes:

- ✅ File type filtering
- ✅ File size limits
- ✅ Safe, unique filenames
- ✅ Middleware validation
- ✅ Support for single, multiple, and field-based uploads
- ✅ Metadata storage placeholder
- ✅ Upload directory security tips

---

### 📦 Enhanced `multer` Setup

```js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = file.fieldname.replace(/\s+/g, '_').toLowerCase();
    const uniqueName = `${safeName}-${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// File type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
  }
};

// Multer instance with limits and filter
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Middleware to validate upload presence
export const validateUpload = (req, res, next) => {
  if (!req.file && (!req.files || Object.keys(req.files).length === 0)) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  next();
};

// Example usage in routes
// Single file upload
// app.post('/upload/avatar', upload.single('avatar'), validateUpload, (req, res) => {
//   // Save metadata to DB here if needed
//   res.json({ file: req.file });
// });

// Multiple files with same field
// app.post('/upload/gallery', upload.array('images', 5), validateUpload, (req, res) => {
//   res.json({ files: req.files });
// });

// Multiple fields
// app.post('/upload/mixed', upload.fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'gallery', maxCount: 8 },
// ]), validateUpload, (req, res) => {
//   res.json({ files: req.files });
// });
```

---

### 🔐 Security TODO

- **Protect `/uploads`**: If you're serving static files, avoid exposing the entire `/uploads` directory. Instead, serve only specific files with access control.
- **Use CDN or signed URLs**: For public access, consider generating signed URLs or proxying through a controller that checks permissions.
- **Sanitize user input**: Always validate `req.body` and `req.query` alongside file uploads.

---