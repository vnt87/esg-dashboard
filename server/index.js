require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));

// API Endpoints

// Get user profile
app.get('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT user_id, name, email, join_date, location, company, bio FROM users WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's disclosures
app.get('/api/disclosures/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM disclosures WHERE user_id = $1 ORDER BY last_updated DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching disclosures:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pagination helper function
const getPaginatedResults = async (query, values, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const countQuery = query.replace(/SELECT .* FROM/, 'SELECT COUNT(*) FROM').split('ORDER BY')[0];
  
  const countResult = await pool.query(countQuery, values);
  const totalItems = parseInt(countResult.rows[0].count);
  
  const paginatedQuery = `${query} LIMIT ${limit} OFFSET ${offset}`;
  const dataResult = await pool.query(paginatedQuery, values);
  
  return {
    data: dataResult.rows,
    totalItems,
    currentPage: page,
    pageSize: limit,
    totalPages: Math.ceil(totalItems / limit)
  };
};

// Get all companies with pagination
app.get('/api/companies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const query = 'SELECT * FROM companies ORDER BY name ASC';
    const result = await getPaginatedResults(query, [], page, limit);
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all portfolios with pagination
app.get('/api/portfolios/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const query = `
      SELECT p.*, 
             COUNT(DISTINCT pc.company_id) as company_count
      FROM portfolios p
      LEFT JOIN portfolio_companies pc ON p.portfolio_id = pc.portfolio_id
      WHERE p.user_id = $1
      GROUP BY p.portfolio_id
      ORDER BY p.last_updated DESC
    `;
    
    const result = await getPaginatedResults(query, [userId], page, limit);
    res.json(result);
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all requests with pagination
app.get('/api/requests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const query = `
      SELECT r.*,
             u1.name as requester_name,
             u2.name as assigned_to_name
      FROM requests r
      LEFT JOIN users u1 ON r.requester_user_id = u1.user_id
      LEFT JOIN users u2 ON r.assigned_to_user_id = u2.user_id
      WHERE r.requester_user_id = $1 OR r.assigned_to_user_id = $1
      ORDER BY r.last_updated DESC
    `;
    
    const result = await getPaginatedResults(query, [userId], page, limit);
    res.json(result);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update disclosures endpoint to support pagination
app.get('/api/disclosures/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const query = `
      SELECT d.*, u.name as user_name
      FROM disclosures d
      JOIN users u ON d.user_id = u.user_id
      WHERE d.user_id = $1
      ORDER BY d.last_updated DESC
    `;
    
    const result = await getPaginatedResults(query, [userId], page, limit);
    res.json(result);
  } catch (err) {
    console.error('Error fetching disclosures:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
