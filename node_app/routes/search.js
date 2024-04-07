const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents');

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {

    req.query.page = parseInt(req.query.page);
    
    var records, 
        limit = 25,
        skip = limit * (req.query.page - 1);

    switch(req.query.field) {

      case "location":

        req.query.lng = parseFloat(req.query.lng);
        req.query.lat = parseFloat(req.query.lat);
        req.query.distance = parseInt(req.query.distance);

        // check if valid search inputs, return nothing if not
        if(isNaN(req.query.lng) || isNaN(req.query.lat) || isNaN(req.query.distance)) {
          
          records = [];
          break;
        }

        records = await accidents.find(
          {
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [req.query.lng, req.query.lat]
                },
                $maxDistance: req.query.distance
              }
            }
          },
          {
            Start_Time: 1,
            End_Time: 1, 
            Description: 1, 
            City: 1, 
            County: 1, 
            Country: 1
          }
        ).skip(skip).limit(limit);
      
        break;

      case "description": 
      
      records = await accidents.find(
        {Description: new RegExp(req.query.fragment, 'i')},
        {
          Start_Time: 1,
          End_Time: 1, 
          Description: 1, 
          City: 1, 
          County: 1, 
          Country: 1
        }
      ).skip(skip).limit(limit);

      break;

    default: 
    
      records = await accidents.find(
        {},
        {
          Start_Time: 1,
          End_Time: 1, 
          Description: 1, 
          City: 1, 
          County: 1, 
          Country: 1
        }
      ).skip(skip).limit(limit);
    }

    res.render(`search`, {searchResults: records, page: req.query.page, field: req.query.field, fragment: req.query.fragment, lat: req.query.lat, lng: req.query.lng, distance: req.query.distance});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;
