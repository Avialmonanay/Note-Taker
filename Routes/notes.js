const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const noteData = require('../db/db.json');
const uuid = require('../helpers/uuid')



notes.get('/', (req, res) => res.json(noteData))



notes.post('/', (req, res) => {

    const {title, note} = req.body
    if (title && note) {
        const newNote = {
            title,
            note,
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
        res.json('Error in posting feedback');
      }
})

module.exports = notes;