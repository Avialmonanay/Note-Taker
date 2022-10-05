//required files and packages.
const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const { writeToFile } = require('../helpers/fsUtils');
const noteData = require('../db/db.json');
const uuid = require('../helpers/uuid')


//get call to pull all current notes in the DB
notes.get('/', (req, res) => res.json(noteData))

//gets a specific note by ID Param
notes.get('/:id', (req, res) => {
    const noteID = req.params.id;
    const note = noteData.find(_note => _note.id === noteID)
    if (note) {
        res.json(note)
    }
    else {
        res.json({message: `Note ${noteID} not found`})
    }
})

//gets a specific note by title param
notes.get('/:title', (req, res) => {
    const noteID = req.params.id;
    const note = noteData.find(_note => _note.id === noteID)
    if (note) {
        res.json(note)
    }
    else {
        res.json({message: `Note ${noteID} not found`})
    }
})

//post call to add a new note to the db requires title and text. Generates a unique ID
notes.post('/', (req, res) => {

    const {title, text} = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            note_Id: uuid(),
        }
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };
        res.json(response)
    }
    else {
        res.json('Error in posting note');
      }
})


//delete call to delete a specific note by note ID.
notes.delete('/:id' , (req, res) => {
    const deleteNote = req.params.id;
    const checkNote = noteData.find(_note => _note.id === deleteNote)
    console.log(checkNote)
    if (checkNote){
    console.log("Delete item with id: ", deleteNote);
 
    const filteredData = noteData.filter(note => note.id !== deleteNote);
    res.status(204)

    writeToFile('./db/db.json', filteredData )
    
}

    else {
        res.json ("ID does not exist")
    }
})


//export calls
module.exports = notes