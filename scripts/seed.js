require('dotenv').config({ quiet: true });

const mongoose = require('mongoose');
const { connectDB } = require('../src/db');
const Note = require('../src/models/note');

const TAGS = ['cloud', 'docker', 'nosql', 'security', 'devops', 'java', 'web'];

async function main() {
  await connectDB(process.env.MONGODB_URI);

  await Note.deleteMany({ owner: 'seed' });

  const docs = Array.from({ length: 2000 }, (_, i) => ({
    title: `Ghi chú mẫu ${i + 1}`,
    content: 'Dữ liệu thử nghiệm',
    tags: [TAGS[i % TAGS.length], TAGS[(i * 3) % TAGS.length]],
    owner: 'seed'
  }));

  await Note.insertMany(docs);
  console.log(`Đã chèn ${docs.length} ghi chú`);
}

main()
  .catch((err) => {
    console.error('Chèn dữ liệu thất bại:', err.name);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());