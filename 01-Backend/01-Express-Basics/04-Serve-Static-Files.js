import express from 'express';

const app = express();
const port = 3000;

// 🧩 Serve all files from the "public" folder
app.use(express.static('public'));

// Optional: root route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
