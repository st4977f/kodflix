const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/kodflix';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
  console.log('Connected successfully to server');
  client.close();
});