export {}; 

const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PRD : process.env.DB_URL_DEV;
// const url = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PRD : process.env.DB_URL_DEV;
const dbName = url?.substring(url.lastIndexOf('/') + 1);

async function connect() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected successfully to server');
    return client.db(dbName);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connect };
