const express = require( 'express' ),
      mongoose = require( 'mongoose' ),
      router = express.Router(),
      url = `mongodb://127.0.0.1:27017/siteInfo`;
      
// establish database connection
mongoose.connect( url )
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// build data model
const siteDefaultsSchema = new mongoose.Schema({
  _id: Number,
  siteName: String
});
const SiteDefaults = mongoose.model( 'defaults', siteDefaultsSchema );

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {
    const defaultsData = await SiteDefaults.findOne( { _id: 1 } );
    console.log( defaultsData );
    res.render( `index`, { title: defaultsData.siteName });
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;


