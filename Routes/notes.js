const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const { writeToFile } = require('../helpers/fsUtils');
const noteData = require('../db/db.json');
const uuid = require('../helpers/uuid')



notes.get('/', (req, res) => res.json(noteData))

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

module.exports = notes