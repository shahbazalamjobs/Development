import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the /api/users routes
app.use('/api/users', usersRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Users API!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
