
require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 3000;

// Kiem tra bien moi truong
if (!process.env.MONGODB_URI) {
  console.error('Thiếu MONGODB_URI');
  process.exit(1);
}

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32
) {
  console.error('Thiếu JWT_SECRET hoặc JWT_SECRET quá ngắn');
  process.exit(1);
}

// Ket noi MongoDB truoc khi khoi dong API
connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `API đang chạy tại cổng ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      'Không kết nối được MongoDB Atlas:',
      err.name
    );

    process.exit(1);
  });
