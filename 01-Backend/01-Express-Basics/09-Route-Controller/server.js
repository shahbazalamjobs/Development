import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Users API!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
