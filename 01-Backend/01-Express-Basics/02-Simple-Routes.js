import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/about', (req, res) => {
    res.json({ 'message': 'this is about page' });
});

app.get('/cotact', (req, res) => {
    res.json({ 'message': 'this is contact page' });
});

app.listen(port, () => {
    console.log(`The app is running at http://localhost:${port}`)
});