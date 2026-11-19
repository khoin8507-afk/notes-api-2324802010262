const express = require('express');
const multer = require('multer');
const { randomUUID } = require('node:crypto');

const Note = require('../models/note');
const { bucket } = require('../storage');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }
});

// Liệt kê ghi chú, có thể lọc theo tag.
router.get('/', async (req, res) => {
  const filter = req.query.tag ? { tags: String(req.query.tag) } : {};
  const notes = await Note.find(filter).sort({ createdAt: -1 }).limit(50);

  return res.json(notes);
});

// Đọc một ghi chú theo ID.
router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
  }

  return res.json(note);
});

// Tạo ghi chú mới.
router.post('/', async (req, res) => {
  const { title, content, tags } = req.body ?? {};
  const note = await Note.create({ title, content, tags });

  return res.status(201).json(note);
});

// Cập nhật ghi chú.
router.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body ?? {};
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content, tags },
    { new: true, runValidators: true }
  );

  if (!note) {
    return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
  }

  return res.json(note);
});

// Xóa ghi chú.
router.delete('/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
  }

  return res.status(204).end();
});

// Tải tệp lên Supabase và lưu URL vào ghi chú.
router.post('/:id/attachment', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Thiếu tệp ở trường "file"' });
  }

  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
  }

  const safeName = req.file.originalname
    .normalize('NFD')
    .replace(/[^\w.-]/g, '_');

  const path = `${note._id}/${randomUUID()}-${safeName}`;
  const attachments = bucket();

  const { error } = await attachments.upload(path, req.file.buffer, {
    contentType: req.file.mimetype
  });

  if (error) {
    console.error('Supabase Storage:', {
      name: error.name,
      status: error.statusCode ?? error.status,
      message: error.message
    });

    return res.status(502).json({ error: 'Không tải được tệp lên Storage' });
  }

  note.attachmentUrl = attachments.getPublicUrl(path).data.publicUrl;
  await note.save();

  return res.json(note);
});

module.exports = router;