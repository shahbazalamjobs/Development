import express from 'express';

const app = express();
const port = 3000;

// ✅ 200 OK
app.get('/success', (req, res) => {
    res.status(200).send('✅ 200 OK - Request successful!');
});

// ✅ 201 Created
app.post('/create', (req, res) => {
    res.status(201).send('✅ 201 Created - Resource successfully created!');
});

// ⚠️ 400 Bad Request
app.get('/bad-request', (req, res) => {
    res.status(400).send('⚠️ 400 Bad Request - Invalid input or parameters!');
});

// 🔒 401 Unauthorized
app.get('/unauthorized', (req, res) => {
    res.status(401).send('🔒 401 Unauthorized - Authentication required!');
});

// 🚫 403 Forbidden
app.get('/forbidden', (req, res) => {
    res.status(403).send('🚫 403 Forbidden - You do not have permission!');
});

// ❌ 404 Not Found
app.get('/not-found', (req, res) => {
    res.status(404).send('❌ 404 Not Found - The resource does not exist!');
});

// 💥 500 Internal Server Error
app.get('/server-error', (req, res) => {
    res.status(500).send('💥 500 Internal Server Error - Something went wrong!');
});

// 🧱 502 Bad Gateway
app.get('/bad-gateway', (req, res) => {
    res.status(502).send('🧱 502 Bad Gateway - Invalid response from upstream server!');
});

// ⏳ 503 Service Unavailable
app.get('/service-unavailable', (req, res) => {
    res.status(503).send('⏳ 503 Service Unavailable - Server temporarily overloaded or down!');
});

// 🧩 Default catch-all for unknown routes
app.use((req, res) => {
    res.status(404).send('🌐 404 - This route does not exist.');
});

// 🚀 Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Try visiting routes like /success, /create, /bad-request, /not-found etc.');
});
