require('dotenv').config({ quiet: true });

const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB(process.env.MONGODB_URI);

  app.listen(PORT, () => {
    console.log(`API đang chạy tại cổng ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Không kết nối được MongoDB Atlas:', err.name);
  process.exitCode = 1;
});