// 1. IMPORT - The 20% (Initialization)
import express from 'express';

// 2. CREATE APP INSTANCE - The 20% (Initialization)
const app = express();
const port = 3000;
app.use(express.json());

// 3. DEFINE ROUTES - The 20% (Routes & Request/Response)

// Root route - using res.send()
app.get('/', (req, res) => {
    res.send('Hello World');
});

// 4. START THE SERVER - The 20% (Listening)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});