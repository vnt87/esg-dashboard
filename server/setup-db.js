require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    // Read the schema SQL file
    const schema = fs.readFileSync('./schema.sql', 'utf8');
    
    // Connect to the database
    const client = await pool.connect();
    console.log('Connected to database');

    try {
      // Execute the schema SQL
      await client.query(schema);
      console.log('Schema setup completed successfully');
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    // End the pool
    await pool.end();
  }
}

// Run the setup
setupDatabase();
