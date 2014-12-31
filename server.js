// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var Bean = require('./models/bean');
var Roast = require('./models/roast');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

//on routes that end in /beans
//------------------------------------------------------------------------------
router.route('/beans') 
    //create a bean (accessed at POST http://localhost:8080/api/beans)
    .post(function(req, res) {
       
       var bean = new Bean();
       bean.name = req.body.name;   //set the beans name (comes from the request)
       //save the bean and check for errors
       bean.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'bean created!'});
       })
    })
    .get(function(req, res) {
        Bean.find(function(err, beans) {
            if (err)
                res.send(err);

            res.json(beans);
        });
    });

router.route('/beans/:bean_id')
// on routes that end in /beans/:bean_id
// ----------------------------------------------------
//get the bean with that id (accessed at GET http://localhost:8080/api/beans/:bean_id)
.get(function(req, res){
    bean.findById(req.params.bean_id, function(err, bean) {
        if (err)
            res.send(err);
        res.json(bean);
    });
});


//on routes that end in /roasts
//------------------------------------------------------------------------------
router.route('/roasts') 
    //create a roast (accessed at POST http://localhost:8080/api/roasts)
    .post(function(req, res) {
       var roast = new Roast(); //create a new instance of the roast model
       roast.date = req.body.date;   //set the roasts name (comes from the request)
       roast.beans = req.body.beans;
       roast.rating = req.body.rating;
       roast.notes = req.body.notes;
       //save the roast and check for errors
       roast.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'roast created!'});
       })
    })
    .get(function(req,res) {
        Roast.find(function(err, roasts) {
            if (err)
                res.send(err);

            res.json(roasts);
        });
    });


router.route('/roasts/:roast_id')
// on routes that end in /roasts/:roast_id
// ----------------------------------------------------
//get the roast with that id (accessed at GET http://localhost:8080/api/roasts/:roast_id)
.get(function(req, res){
    roast.findById(req.params.roast_id, function(err, roast) {
        if (err)
            res.send(err);
        res.json(roast);
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);