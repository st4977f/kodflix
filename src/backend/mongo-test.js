const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27018/kodflix';

async function testConnection() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected successfully to server');
    await client.close();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

testConnection();