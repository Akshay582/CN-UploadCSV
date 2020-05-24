const express = require( 'express' );
const router = express.Router();

const csvController = require( '../controller/csvController' );

router.get( '/', csvController.homepage );

router.post( '/upload', csvController.upload );

router.post( '/selected', csvController.selected );

module.exports = router;
