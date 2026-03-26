require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
(async () => {
  const sql = fs
    .readFileSync(
      require('path').join(
        __dirname,
        '..',
        'migrations',
        '0001-CreateSchema.ts',
      ),
    )
    .toString();
  // extract SQL inside the `up` method only
  const upStart = sql.indexOf('public async up');
  const downStart = sql.indexOf('public async down');
  const upBlock =
    downStart > -1 ? sql.slice(upStart, downStart) : sql.slice(upStart);
  const match = upBlock.match(/queryRunner\.query\(`([\s\S]*?)`\);/);
  if (!match) {
    console.error('No SQL found in migration file (up)');
    process.exit(1);
  }
  const fullSql = match[1];
  console.log('SQL preview:', fullSql.slice(0, 200));
  console.log('SQL raw:', JSON.stringify(fullSql.slice(0, 500)));
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    console.log('Connected to DB');
    await client.query('BEGIN');
    let parts = fullSql
      .split(/;/)
      .map((s) => s.replace(/`/g, '').trim())
      .filter(Boolean);
    for (const part of parts) {
      if (part.includes('queryRunner') || part === ')' || part === ');')
        continue;
      const stmt = part.endsWith(';') ? part : part + ';';
      console.log('Executing statement:', stmt.slice(0, 80));
      await client.query(stmt);
    }
    await client.query('COMMIT');
    console.log('Migration executed');
  } catch (err) {
    console.error('Migration error:', err.message);
    try {
      await client.query('ROLLBACK');
    } catch (e) {}
  } finally {
    await client.end();
  }
})();
