//required files and packages.
const express = require('express');
const path = require('path');
const { readAndAppend } = require('./helpers/fsUtils');
const { writeToFile } = require('./helpers/fsUtils');
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid')

//Static port
const PORT = process.env.PORT || 3000;

//app to use express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'))

//application home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);
// app.get('/api/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/db/db.json'))
// );

//required files and packages.



//get call to pull all current notes in the DB
app.get('/api/notes', (req, res) => res.json(noteData))

//gets a specific note by ID Param
app.get('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    const note = noteData.find(_noteData => _noteData.id === noteID)
    if (note) {
        res.json(note)
    }
    else {
        res.json({message: `Note ${noteID} not found`})
    }
})

//gets a specific note by title param
app.get('/api/:title', (req, res) => {
    const noteID = req.params.id;
    const note = noteData.find(_noteData => _noteData.id === noteID)
    if (note) {
        res.json(note)
    }
    else {
        res.json({message: `Note ${noteID} not found`})
    }
})

//post call to add a new note to the db requires title and text. Generates a unique ID
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };
        res.status(200).json(response)
    }
    else {
        res.json('Error in posting note');
      }
})


//delete call to delete a specific note by note ID.
app.delete('/api/notes/:id' , (req, res) => {
    const deleteNote = req.params.id;
    const checkNote = noteData.find(_noteData => _noteData.id === deleteNote)
    console.log(checkNote)
    if (checkNote){
    console.log("Delete item with id:",deleteNote);
 
    const filteredData = noteData.filter(_noteData => _noteData.id !== deleteNote);
    res.status(204)

    writeToFile('./db/db.json', filteredData )
    
}

    else {
        res.json ("ID does not exist")
    }
})



//console log when the port becomes active
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);