const express = require('express');
const os = require('node:os');
const notesRouter = require('./routes/notes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Xin chào từ đám mây!',
    host: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    cpus: os.cpus().length,
    memoryGB: Number((os.totalmem() / 1024 ** 3).toFixed(1)),
    uptimeSec: Math.round(os.uptime()),
    time: new Date().toISOString()
  });
});

app.use('/notes', notesRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Tệp vượt quá giới hạn 2 MiB' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID hoặc kiểu dữ liệu không hợp lệ' });
  }

  if (err.name === 'ValidationError' || err.status === 400) {
    return res.status(400).json({ error: 'Dữ liệu gửi lên không hợp lệ' });
  }

  console.error('Lỗi xử lý yêu cầu:', err.name);
  return res.status(500).json({ error: 'Lỗi máy chủ' });
});

module.exports = app;