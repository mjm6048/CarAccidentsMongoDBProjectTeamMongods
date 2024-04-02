const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents');

router.get('/')

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {

    req.query.page = parseInt(req.query.page);

    const records = await accidents.find(
      {Description: new RegExp(req.query.fragment, 'i')},
      {
          Start_Time: 1,
          End_Time: 1, 
          Description: 1, 
          City: 1, 
          County: 1, 
          Country: 1
      }
    ).skip(25 * (req.query.page - 1)).limit(25);

    // console.log(records);

    res.render(`search`, {searchResults: records, page: req.query.page, fragment: req.query.fragment});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;
