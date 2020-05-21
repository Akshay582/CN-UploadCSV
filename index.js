const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Init app variable
const app = express();

const PORT = 3000;

// Settings of app

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(PORT, function (err) {
  if (err) {
    return console.error('Encountered error while running server: ', err);
  }
  return console.log('Server running successfully at PORT: ', PORT);
});
