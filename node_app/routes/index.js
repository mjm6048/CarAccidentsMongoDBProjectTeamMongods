const { ObjectId, Decimal128 } = require('mongodb');

const express = require( 'express' ),
      mongoose = require( 'mongoose' ),
      router = express.Router(),
      url = `mongodb://127.0.0.1:27017/mongoProject`;
      
// establish database connection
mongoose.connect( url )
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const accidentsSchema = new mongoose.Schema({
  _id: ObjectId,
  Severity: Number,
  Start_Time: Date,
  End_Time: Date,
  Start_Lat: Decimal128,
  Start_Lng: Decimal128,
  Description: String,
  Street: String,
  City: String,
  County: String,
  State: String,
  Zipcode: String,
  Country: String,
  Timezone: String,
  Weather_Timestamp: Date,
  Weather_Condition: String,
  Comments: String
});

const accidents = mongoose.model('accidents', accidentsSchema);

// build data model
// const siteDefaultsSchema = new mongoose.Schema({
//   _id: Number,
//   siteName: String
// });
// const SiteDefaults = mongoose.model( 'defaults', siteDefaultsSchema );

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {
    // const defaultsData = await SiteDefaults.findOne( { _id: 1 } );
    // console.log( defaultsData );
    // res.render( `index`, { title: defaultsData.siteName });

    const test = await accidents.find({}, {Description: 1}).limit(5);
    res.render(`index`, {title: test});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;


