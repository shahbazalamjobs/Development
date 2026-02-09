import express from 'express'
const app = express();
const port = 3000;

app.use(logginMiddleware);


app.get('/' , (req, res) => {
    res.send('Hello World !!')
});

function logginMiddleware (req, res, next) {
    console.log('logging Middleware');
    console.log(`${new Date().toISOString()} : ${req.originalUrl}`)
    next();
}

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`)
});