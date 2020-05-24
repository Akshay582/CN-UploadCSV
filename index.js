const express = require( 'express' );
const ejs = require( 'ejs' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );

// Init app
const app = express();

const PORT = 3000;

// Settings of app

app.set( 'view engine', 'ejs' );
app.set( 'views', './views' );

app.use( express.static( './public' ) );

app.use( express.urlencoded() );
app.use( bodyParser() );

app.use( '/', require( './routes/csv' ) );

app.listen( PORT, function ( err ) {
    if ( err ) {
        return console.error( 'Encountered error while running server: ', err );
    }
    return console.log( 'Server running successfully at PORT: ', PORT );
} );
