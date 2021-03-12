const express = require('express');
const fs = require('fs');
const userNote = require('./db/db.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response, json } = require('express');
const { error } = require('console');



const PORT = process.env.PORT || 3000;

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, './public/notes.html'), error => {
        if (error) console.error(error);
    });
});

app.get('/api/notes', (request, response) => {
    fs.readFile('db/db.json', 'utf-8', function (error, content) {
        let alpha = JSON.parse(content);
        response.send(alpha);

    });
});

app.post('/api/notes', (request, response) => {
    fs.readFile('db/db.json', (error, data) => {
        if (error) throw error;
        const newNote = request.body;
        userNote.id = uuidv4(userNote.id);


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
        userNote.push(data);
        data.id++;
    });
});



app.delete("/api/notes/:id", (request, response) => {
    const noteID = request.params.id;
    note = userNote.filter((notes, index) => {
        return noteID !== notes.id;
    });
    fs.writeFile("db/db.json", JSON.stringify(note), (error) => {
        if (error) throw error;
    });
    response.json(true);
});


// app.delete("/api/notes/:id", function (request, response) {
//     userNote.splice(request.params.id, 1);
//     fs.writeFile("db/db.json", JSON.stringify(userNote, '\t'), err => {
//         if (error) throw error;
//         return true;
//     })
//  
// });




app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
});
