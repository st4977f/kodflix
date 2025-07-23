import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const db = require('./db');


import { Db } from 'mongodb';

db.connect()
  .then((dbo: Db) => {
    app.get('/rest/shows', (_req: express.Request, res: express.Response) => {
      dbo.collection('shows').find({}).toArray()
        .then((results: any[]) => res.send(results))
        .catch((err: any) => res.status(500).send({ error: err.message }));
    });
  })
  .catch((err: any) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));


/*

Backend serves the frontend build files // Monorepo

const buildPath = path.join(__dirname, '../../build');
app.use(express.static(buildPath)); */


/*

// Catch-all route to serve the frontend application // Monorepo

app.get(/^\/(?!rest\/).*$/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});*/



