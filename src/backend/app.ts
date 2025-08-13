import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

const db = require('./db');
import { Db } from 'mongodb';
import bcrypt from 'bcrypt';

db.connect()
  .then((dbo: Db) => {
    // --- Admin-only middleware ---
    function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
      const user = (req as any).user;
      if (user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ error: 'Admin access required' });
      }
    }

    // Admin-only route
    app.get('/api/admin/tv-shows', authenticateJWT, requireAdmin, (req: express.Request, res: express.Response) => {
      res.json({ message: 'You are an admin!' });
    });
    app.get('/rest/shows', (_req: express.Request, res: express.Response) => {
      dbo.collection('shows').find({}).toArray()
        .then((results: any[]) => res.send(results))
        .catch((err: any) => res.status(500).send({ error: err.message }));
    });

    // Add new show
    app.post('/api/shows', (req: express.Request, res: express.Response) => {
      const newShow = req.body;
      dbo.collection('shows').insertOne(newShow)
        .then(() => res.status(201).json({ message: 'Show added!' }))
        .catch((err: any) => res.status(500).send({ error: err.message }));
    });

    // Edit existing show 

    app.put('/api/shows/:id', (req: express.Request, res: express.Response) => {
      const updatedShow = req.body;
      const showId = req.params.id;
      dbo.collection('shows').updateOne({ id: showId }, { $set: updatedShow })
        .then(() => res.status(200).json({ message: 'Show updated!' }))
        .catch((err: any) => res.status(500).send({ error: err.message }));
    });

    // Delete show
    app.delete('/api/shows/:id', (req: express.Request, res: express.Response) => {
      const showId = req.params.id;
      dbo.collection('shows').deleteOne({ id: showId })
        .then(() => res.status(200).json({ message: 'Show deleted!' }))
        .catch((err: any) => res.status(500).send({ error: err.message }));
    });

    // --- User Registration ---
    app.post('/api/register', async (req: express.Request, res: express.Response) => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
      }
      try {
        const existingUser = await dbo.collection('users').findOne({ $or: [ { username }, { email } ] });
        if (existingUser) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await dbo.collection('users').insertOne({ username, email, password: hashedPassword });
        // Issue JWT
        const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: 'Registration successful!', token });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    // --- User Login ---
    app.post('/api/login', async (req: express.Request, res: express.Response) => {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
      }
      try {
        const user = await dbo.collection('users').findOne({ username });
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Issue JWT
        const token = jwt.sign({
          username: user.username,
          email: user.email,
          role: user.role // <-- this is required!
        }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful!', token });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });
    // --- JWT Middleware ---
    function authenticateJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
          }
          (req as any).user = user;
          next();
        });
      } else {
        res.status(401).json({ error: 'No token provided' });
      }
    }

    // Example protected route
    app.get('/api/manage/tv-shows', authenticateJWT, async (req: express.Request, res: express.Response) => {
      const user = (req as any).user;
      res.json({ user });
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
});

// Serve static files from the React app
const buildPath = path.join(__dirname, '../../build');
app.use(express.static(buildPath)); 

// Serve index.html for all non-API routes (SPA fallback)
app.get(/^(?!\/(api|rest)).*$/, (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

