import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;
const db = require('./db');

// Absolute path to React build folder
const buildPath = path.join(__dirname, '../../build');

// --- API ROUTES ---
import { Db } from 'mongodb';

db.connect().then((dbo: Db) => {
  app.get('/rest/shows', (_req: express.Request, res: express.Response) => {
    dbo.collection('shows').find({}).toArray().then((results: any[]) => {
      res.send(results);
    }).catch((err: any) => {
      res.status(500).send({ error: err.message });
    });
  });
});

app.get('/rest/shows', (_req, res) => {
  res.status(503).send({ error: 'Database not connected' });
});

// --- STATIC FILES ---
app.use(express.static(buildPath));

// --- CATCH-ALL FOR CLIENT ROUTING ---
app.get(/^\/(?!rest\/).*$/, function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

