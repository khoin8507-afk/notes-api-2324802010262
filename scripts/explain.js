require('dotenv').config({ quiet: true });

const mongoose = require('mongoose');
const { connectDB } = require('../src/db');
const Note = require('../src/models/note');

function pickStats(result) {
  const report = Array.isArray(result) ? result[0] : result;
  const stats = report.executionStats;

  return {
    docsExamined: stats.totalDocsExamined,
    returned: stats.nReturned,
    ms: stats.executionTimeMillis
  };
}

async function main() {
  await connectDB(process.env.MONGODB_URI);
  await Note.createIndexes();

  const filter = { tags: 'docker' };

  const scan = pickStats(
    await Note.find(filter).hint({ $natural: 1 }).explain('executionStats')
  );

  const indexed = pickStats(
    await Note.find(filter).hint('tags_1').explain('executionStats')
  );

  console.table({
    'Quét toàn bộ': scan,
    'Dùng chỉ mục tags_1': indexed
  });

  if (scan.returned === indexed.returned && indexed.docsExamined > 0) {
    const ratio = scan.docsExamined / indexed.docsExamined;
    console.log(`Quét toàn bộ / dùng chỉ mục: ${ratio.toFixed(2)} lần`);
  }
}

main()
  .catch((err) => {
    console.error('Đo truy vấn thất bại:', err.name);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());