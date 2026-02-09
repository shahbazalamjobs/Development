
import express from 'express'
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/users', authorizeMiddleware, (req, res) => {
    console.log('Hello User');
    res.send('Hello User')
})

app.use(loggingMiddleware);

function loggingMiddleware(req, res, next) {
    console.log(`${new Date().toISOString()} : ${req.originalUrl}`)
    next()
}

function authorizeMiddleware(req, res, next) {
    console.log('Authorized Access Middleware')
    next()
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});