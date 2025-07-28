import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 3001;
app.use(cors());

const db = require('./db');
import { Db } from 'mongodb';

db.connect()
  .then((dbo: Db) => {
    app.get('/rest/shows', (_req, res) => {
      dbo.collection('shows').find({}).toArray()
        .then(results => res.send(results))
        .catch(err => res.status(500).send({ error: err.message }));
    });

    // Start server ONLY after DB is ready
    app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
  })
  .catch((err: any) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if DB connection fails
  });


/*

Backend serves the frontend build files // Monorepo

const buildPath = path.join(__dirname, '../../build');
app.use(express.static(buildPath)); */


/*

// Catch-all route to serve the frontend application // Monorepo

app.get(/^\/(?!rest\/).*$/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});*/



