const path = require('path')
const express = require('express');
const fs = require('fs');
const { request } = require('http');
const { response } = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, './public/index.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/notes', function (request, response) {
    response.sendFile(path.resolve(__dirname, './public/notes.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/api/notes', function (request, response) {
    fs.readFile('db/db.json', 'utf-8', function (error, content) {
        let alpha = JSON.parse(content);
        response.send(alpha);
    });
});

app.post('/api/notes', (request, response) => {
    fs.readFile('db/db.json', (error, data) => {
        if (error) throw error;

        let json = JSON.parse(data);

        let noteEntry = {
            title: request.body.title,
            text: request.body.text
        };

        json.push(noteEntry);

        fs.writeFile('db/db.json', JSON.stringify(json, null, 3), (error) => {
            if (error) throw error;
            response.send('202');

        });
    });
});



app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
});