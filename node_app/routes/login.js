const { ObjectId } = require('mongodb');

const express = require( 'express' ),
      router = express.Router(),
      users = require('../models/users'),
      {createHash} = require('crypto');

router.get('/', async (req, res) => {

    try {

        res.render(`index`, {redirect: req.query.redirect, invalid: req.query.invalid});
        
    }catch(error) {

        console.error( error );
        res.status( 500 ).send( 'Internal Server Error' );
    }
});

router.post('/login', async (req, res) => {

    try {

        console.log(`${req.body.user}: ` + createHash('sha256').update(req.body.pass).digest('base64'));

        const exists = await users.exists(
            {
                Username: req.body.user,
                Password: createHash('sha256').update (req.body.pass).digest('base64')
            }
        );

        if(exists) {

            req.session.loggedIn = true;
            req.session.save();

            console.log(req.query.redirect);

            return res.status(200).redirect(
                req.query.redirect ?
                req.query.redirect :
                '/search'
            );
        }

        res.status(404).redirect('/?invalid=1' + (req.query.redirect ? "&redirect=" + req.query.redirect : ""));

    }catch(error) {

        console.error( error );
        res.status( 500 ).send( 'Internal Server Error' );
    }
});

module.exports = router;
