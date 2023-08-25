const db = require("../db/db.json")
const randomString = require("randomstring")
const notes = require("express").Router();
fs = require("fs");


//reads JSON file

notes.get('/', (req, res) => {
    res.json(db)
}
);


//Adds new notes to the JSON file and redisplays them to notes.html

notes.post('/', (req, res) => {

    const { title, text } = req.body

    if (title && text) {
        const logNote = {
            title,
            text,
            id: randomString.generate(4)
        };

        db.push(logNote)

        const noteString = JSON.stringify(db, null, 2)

        fs.writeFile("./public/db/db.json", noteString, (err) => {
            if (err) {
                console.error(err)
                return res.status(400).json('Error in posting note');
            } else {
                console.log(`Note for ${logNote.title} has been written to JSON file`);

                const response = {
                    status: 'success',
                    body: logNote,
                };

                return res.status(201).json(response);
            }
        });


    }

    else {
        res.status(500).json('Error in posting note');
    }


});

//Identifies the unique ID associated with each note on the page

notes.get('/:id', (req, res) => {
    const requestedId = req.params.id;
    let id = db.filter((id) => id === requestedId)
    if (id)
        return res.json(id)
});


//Removes note from JSON file when 'delete' icon is clicked

 
notes.delete('/:id', (req, res) => {

    const deleteId = req.params.id;
    let deleteNote = db.filter(note => note.id !== deleteId)

    const newString = JSON.stringify(deleteNote, null, 2)

    fs.writeFile("./public/db/db.json", newString, (err) => {
          if (err) {
            console.error(err)
            return res.status(400).json('Error in deleting item');
        }
    });

    return res.json(newString)
});


module.exports = notes;