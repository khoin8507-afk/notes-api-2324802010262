
const express = require('express');
const os = require('os');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

// Chong NoSQL Injection
mongoose.set('sanitizeFilter', true);

const app = express();

// Cau hinh proxy theo yeu cau de bai
app.set('trust proxy', 1);

// Bo sung HTTP Security Headers
app.use(helmet());

// Gioi han kich thuoc JSON request
app.use(express.json({ limit: '100kb' }));

// Gioi han 20 request trong 15 phut
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'Quá nhiều yêu cầu, vui lòng thử lại sau'
  }
});

// API dang ky va dang nhap
app.use('/auth', authLimiter, authRouter);

// Hello Cloud API - Bai 1
app.get('/', (req, res) => {
  res.json({
    message: 'Xin chào từ đám mây!',
    host: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    cpus: os.cpus().length,
    memoryGB: Number(
      (os.totalmem() / 1024 ** 3).toFixed(1)
    ),
    uptimeSec: Math.round(os.uptime()),
    time: new Date().toISOString()
  });
});

// Notes API - Bai 3 va Bai 4
app.use('/notes', notesRouter);

// Middleware xu ly loi
app.use((err, req, res, next) => {
  console.error(err.name || 'Error');

  const clientError =
    ['ValidationError', 'CastError'].includes(err.name)
    || err.code === 'LIMIT_FILE_SIZE';

  if (err.status === 413) {
    return res.status(413).json({
      error: 'Dữ liệu gửi lên quá lớn'
    });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'JSON không hợp lệ'
    });
  }

  res.status(clientError ? 400 : 500).json({
    error: clientError
      ? err.message
      : 'Lỗi máy chủ nội bộ'
  });
});

module.exports = app;
