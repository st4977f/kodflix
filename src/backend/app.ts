import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;
const db = require('./db');

const buildPath = path.join(__dirname, '../../build');

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

app.use(express.static(buildPath));

app.get(/^\/(?!rest\/).*$/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

