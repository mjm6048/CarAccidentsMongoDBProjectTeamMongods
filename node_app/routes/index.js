const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents');

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {

    const test = await accidents.find({}, {Description: 1}).limit(5);
    res.render(`index`, {title: test});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;


