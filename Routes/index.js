//router index. This was added so implimenting future routes will be easier to link to the server.js
const express = require('express');

const notesRouter = require('./notes')

const app = express();

//uses the notes.js files API calls.
app.use('/notes', notesRouter);

//export as app
module.exports = app;