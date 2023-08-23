const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const db = require("./public/db/db.json")
const randomString = require("randomstring")
const fs = require("fs/promises")
console.log(randomString.generate(5));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
  });

app.get('/api/notes', (req, res) =>
  res.json(db)
);

app.post('/api/notes', (req, res) => {
 
  const {title, text} = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: randomString.generate(4)
    };

    db.push(newNote)

    const noteString = JSON.stringify(db, null, 2)

    fs.writeFile("./db.json", noteString, (err) =>
    err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(400).json('Error in posting review');
  }

});


app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);