export {}; // <-- Add this line

const MongoClient = require('mongodb').MongoClient;

const db = {
  host: 'localhost',
  port: '27017',
  name: 'kodflix'
};

const url = `mongodb://${db.host}:${db.port}/${db.name}`;
module.exports = { connect };

function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      function (err, client) {
        if (err) {
          console.error('MongoDB connection error:', err);
          reject(err);
          return;
        }
        console.log('Connected successfully to server');
        const dbo = client.db(db.name);
        resolve(dbo);
      }
    );
  });
}
