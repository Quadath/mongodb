const express = require('express')
const {
    connectToDb,
    getDb
} = require('./db')

const PORT = 3000;

const app = express();

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening on port ${PORT}`);
            db = getDb();
        })
    } else {
        console.log(`DB error ${err}`)
    }
})

app.get('/movies', (req, res) => {
    const movies = [];

    db.collection('movies')
        .find()
        .sort({title: 1})
        .forEach((movie) => movies.push(movie))
        .then(() => {

            res.json(movies)
        })
        .catch(() => {
            res.status(500)
                .json({
                    error: "Something went wrong..."
                })
        })
})
app.get('/pidori', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end('<h1>Пидоры ёбаные ненавижу вас сукаа!11!!!</h1>')
})

app.get('/anya', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end('<h1>Привет, Аня <3</h1>')
})