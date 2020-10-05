import express from 'express';
import cors from 'cors';

const bodyParser = require('body-parser')
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('banco.json')
const db = lowdb(adapter);

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send(db.get('books').value());
});

app.post('/:id', function(req, res) {
  db.get('books')
    .find({ "id": req.params.id })
    .assign({ 'loaned': "true", 'person_name': req.body.person_name, 'date': req.body.date })
    .value();

  try {
    res.send(db.get('books').value());
  } catch(err) {
    return res.status(400).json({
      error: 'O servidor está temporariamente indisponível.'
    })
  }    
});

app.post('/give-back/:id', function(req, res) {
  db.get('books')
    .find({ "id": req.params.id })
    .assign({ 'loaned': 'false', "person_name": "", 'date': "" })
    .value();

  try {
    res.send(db.get('books').value());
  } catch(err) {
    return res.status(400).json({
      error: 'O servidor está temporariamente indisponível.'
    })
  }     
})

app.listen(3333);

