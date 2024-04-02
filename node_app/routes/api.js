const { ObjectId, Decimal128 } = require('mongodb');

const express = require( 'express' ),
      router = express.Router(),
      accidents = require('../models/accidents');

router.get('/search', async (req, res) => {
    
    // debug
    console.log(req.query);
    // req.query must contain - fragment: str, page: num

    try{

        req.query.page = parseInt(req.query.page);

        const query = await accidents.find(
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

        res.status(200).json(query);

    }catch(err) {

        console.log(err);
        res.status(422).json({message: "missing query parameters"});
    }

})

module.exports = router;
