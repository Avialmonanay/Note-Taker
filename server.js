//required files and packages.
const express = require('express');
const path = require('path');
const api = require('./Routes/index.js');

//Static port
const PORT = 8080;

//app to use express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'))

//application home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

//console log when the port becomes active
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);