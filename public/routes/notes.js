const db = require("../db/db.json")
const randomString = require("randomstring")
const notes = require("express").Router();




notes.get('/', (req, res) =>{
    res.json(db)
}
);



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
                return res.status(400).json('Error in posting review');
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
            res.status(500).json('Error in posting review');
        }
        
        
  });

notes.get('/:id', (req, res) => {
 const requestedId = req.params.id;
 let [id] = db.filter((id) => id === requestedId)
 if (id)
 return res.json(id)
});


module.exports = notes;