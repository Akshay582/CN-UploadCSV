const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init the upload variable
const upload = multer({
  storage,
}).single('myCSV');

// Init app
const app = express();

const PORT = 3000;

// Settings of app

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('home');
});

app.post('/upload', function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
      });
    } else {
      console.log(req.file);
      res.send('test');
    }
  });
});

app.listen(PORT, function (err) {
  if (err) {
    return console.error('Encountered error while running server: ', err);
  }
  return console.log('Server running successfully at PORT: ', PORT);
});
