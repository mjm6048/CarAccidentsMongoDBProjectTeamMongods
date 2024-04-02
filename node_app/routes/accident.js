const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');
const Grid = require('gridfs-stream')

const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents');

const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection('images');
});

router.get('/img/:id', async (req, res) => {
    gfs.files.findOne(
        {filename: new RegExp(req.params.id, 'i')},
        (err, file) => {
            if(!file || file.length === 0){
                return res.status(404).json({err: 'No File Exists'});
            } else {
                // Check if is image
                if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
                    // Read output to broswer
                    const readstream = gfs.createReadStream(file.filename);
                    readstream.pipe(res);
                } else {
                    res.status(404).json({err: 'Not and image'});
                }
            }
            // const stream = gfs.createReadStream(file.filename);
            // stream.pipe(res);
        }
    );
})

router.get('/:ref', async ( req, res ) => { 
      
  try {

    const record = await accidents.findOne(
        {_id: new ObjectId(req.params.ref)}
    );

    var image;

    // console.log(records);

    res.render(`accident`, {accident: record});
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;
