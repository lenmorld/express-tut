// encapsulate all foods related logic to this file

var express = require('express');
var router = express.Router();          // returns router instance which can be mounted as a middleware

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });		// use native Node querystring library

var foods = {
    'banana': 'yellow and long',
    'fries': 'Greasy and crispy',
    'bbq': 'Grilled and spicy'
};

router.route('/')              // path is relative to where it's mounted in app.js [app.use('/foods')]
    .get(function(request, response) {
        response.send(Object.keys(foods));		// get foods instead of desc
    })
    .post(parseUrlEncoded, function (request, response) {
        var newFood = request.body;
        foods[newFood.name] = newFood.description;

        response.status(201)				// 201 CREATED
            .json(newFood.name);
    });

// dynamic route
router.route('/:name')          // just the name path relative to the path where it's mounted in app.js [app.use('/foods')]
    .all(function (request, response, next) {           // alternative to app.param('name'), must be first
        // normalize for case-insensitive
        var name = request.params.name;
        var paramName = name.toLowerCase();
        // do other param cleansing here
        request.paramName = paramName;
        next();
    })
    .get(function (request, response) {
        var description = foods[request.paramName];
        if (!description) {
            response.status(404)
                .json('No desc found for ' + request.params.name);
        } else {
            response.json(description);
        }
    })
    .delete(function (request, response) {
        console.log(request.paramName);
        delete foods[request.paramName];
        console.log(foods);
        response.sendStatus(200);
    });

module.exports = router;            // export router as Node module