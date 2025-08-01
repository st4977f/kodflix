export {}; 

const { MongoClient } = require('mongodb');
const path = require('path');

const dotenvPath = path.resolve(process.cwd(), '.env');
require('dotenv').config({ path: dotenvPath });

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL_PRD
    : process.env.DB_URL_DEV;

if (!url) {
  throw new Error(
    `MongoDB connection string is not set! (${process.env.NODE_ENV === 'production' ? 'DB_URL_PRD' : 'DB_URL_DEV'})`
  );
}

const dbName = url.substring(url.lastIndexOf('/') + 1);

async function connect() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connected successfully to server');
    return client.db(dbName);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connect };
