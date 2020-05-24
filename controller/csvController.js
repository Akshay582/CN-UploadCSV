const path = require( 'path' );
const fs = require( 'fs' );
const multer = require( 'multer' );
const parse = require( 'csv-parse' );

const uploadsFolder = './public/uploads';

// Set Storage Engine
const storage = multer.diskStorage( {
  destination: uploadsFolder,
  filename: function ( req, file, cb ) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname( file.originalname )
    );
  },
} );

// Init the upload variable
const upload = multer( {
  storage,
  limits: { fileSize: 1000000 },
} ).single( 'myCSV' );

// Read one file's content

const csvData = [];

const filePath = "C:/Users/befor/Desktop/CNUploadCSV/public/uploads/myCSV-1590250493364.csv";

fs.createReadStream( filePath )
  .pipe(
    parse( {
      delimiter: ','
    } )
  )
  .on( 'data', function ( datarow ) {
    csvData.push( datarow );
  } )
  .on( 'end', function () {
  } )

let csvList = [];

module.exports.homepage = function ( req, res ) {
  // Read all the file names that have been uploaded
  fs.readdir( uploadsFolder, ( err, files ) => {
    if ( err ) {
      console.error( 'Encountered an error while reading file: ', err );
    }
    csvList = files;
    res.render( 'home', {
      csvList: files
    } );
  } )
};

module.exports.selected = function ( req, res ) {
  const file = path.join( __dirname, '../public/uploads/' + req.body[ 'selected-csv-file' ] );
  const data = [];
  fs.createReadStream( file )
    .pipe(
      parse( {
        delimiter: ','
      } )
    )
    .on( 'data', function ( datarow ) {
      data.push( datarow );
    } ).on( 'end', function () {
      res.render( 'home', {
        csvList,
        csvData: data,
      } );
    } );
}

module.exports.upload = function ( req, res ) {
  upload( req, res, ( err ) => {
    if ( err ) {
      res.render( 'home', {
        msg: err,
        csvList,
        csvData,
      } );
    } else {
      if ( req.file == undefined ) {
        res.render( 'home', {
          msg: 'No file selected. Please select a file and try again.',
          csvList,
          csvData,
        } );
      } else {
        res.render( 'home', {
          msg: 'File uploaded.',
          csvList,
          csvData,
          file: `uploads/${req.file.filename}`,
        } );
      }
    }
  } );
};
