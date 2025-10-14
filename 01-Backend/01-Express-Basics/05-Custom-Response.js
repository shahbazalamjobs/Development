// Import express
import express from 'express';

const app = express();
const port = 3000;

// 🔒 Optional: Disable Express’s default "X-Powered-By: Express"
app.disable('x-powered-by');

// 🧩 Middleware to set a custom header for every response
app.use((req, res, next) => {
    res.set('X-Powered-By', 'NodeJS'); // 👈 Add custom header
    next(); // Continue to next middleware or route
});

// 🏠 Example route
app.get('/', (req, res) => {
    res.send('Hello from NodeJS server!');
});

// 🚀 Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});