const { ObjectId } = require('mongodb');

const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents'),
      fsFiles = require('../models/fsFiles'),
      fsChunks = require('../models/fsChunks');


router.get('/img/:id', async (req, res) => {

  try {

    const file = await fsFiles.findOne({filename: new RegExp(req.params.id, 'i')});

    if(file == null) {
        return res.status(404).json({message: "Not Found"});
    }

    const chunks = await fsChunks.find({files_id: file._id}, {_id: 0, data: 1}).sort({n: 1});

    res.writeHead(200, {'Content-Type': 'image/jpg'});

    chunks.forEach(chunk => {
        res.write(chunk.data);
    });

    res.end();

  }catch(error) {

    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }

});

router.get('/:ref', async ( req, res ) => { 
      
  try {

    const record = await accidents.findOne(
        {_id: new ObjectId(req.params.ref)}
    );

    // console.log(records);

    res.render(`accident`, {accident: record, loggedIn: req.session.loggedIn});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

router.post('/comment', async (req, res) => {

  try {

    if(!req.session.loggedIn) return res.status(401);

    const updated = await accidents.findOneAndUpdate(
        {_id: new ObjectId(req.query.id)},
        {$push: {Comments: req.body.comment}},
    );

    res.redirect(`/accident/${req.query.id}`);

  } catch(error) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
});

module.exports = router;
