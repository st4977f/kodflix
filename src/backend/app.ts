import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

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

// Endpoint to get details of a specific show by ID

  app.get('/rest/shows/:id', (req: express.Request, res: express.Response) => {
    const showId = req.params.id;
    db.connect()
      .then((dbo: Db) => {
        dbo.collection('shows').findOne({ id: showId })
          .then((show: any) => {
            if (show) {
              res.send(show);
            }
          })
          .catch((err: any) => res.status(500).send({ error: err.message }));
      })
      .catch((err: any) => res.status(500).send({ error: 'Database connection error' }));
  })

// Serve static files from the React app

const buildPath = path.join(__dirname, '../../build');
app.use(express.static(buildPath)); 

// Serve index.html for all non-API routes

app.get(/^\/(?!rest\/).*$/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});




