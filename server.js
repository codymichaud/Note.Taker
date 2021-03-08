const path = require('path')
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/index.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/notes', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/notes.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/api/notes', function (req, res) {
    fs.readFile('db/db.json', 'utf-8', function (error, content) {
        let alpha = JSON.parse(content);
        res.send(alpha);
    });
});

app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
});