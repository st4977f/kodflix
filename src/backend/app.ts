import express from 'express';
import getShows from './shows';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// Absolute path to React build folder
const buildPath = path.join(__dirname, '../../build');

// Serve static files from React build
app.use(express.static(buildPath));

// API routes (MUST be before catch-all)
app.get('/rest/shows', (req, res) => {
  res.json(getShows());
});

// Catch-all route for client-side routing
app.get(/^\/(?!rest\/).*$/, function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));