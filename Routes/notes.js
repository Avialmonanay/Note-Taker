const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const noteData = require('../db/db.json')



notes.get('/', (req, res) => res.json(noteData))




module.exports = notes;