import express from 'express';
import getShows from './shows';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/rest/shows', (req, res) => {
  res.send(getShows());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});