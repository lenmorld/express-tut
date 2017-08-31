var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });		// use native Node querystring library
// parseUrlEncoded is now a middleware function

// must put ours before the real ones, make sure ours has next()
var logger = require('./mymiddleware');
app.use(logger);

app.use(express.static('public'));		// static folder public

app.get('/', function(request, response) {
	// response.send('Hello world');
	response.sendFile(__dirname__ + '/public/index.html');
});

/* MIDDLEWARE functions */

// app.use(function(request, response, next) {
// 	next();
// });

// URL
// limit number of foods returned

var foods = {
	'banana': 'yellow and long',
	'fries': 'Greasy and crispy',
	'bbq': 'Grilled and spicy'
};

var drinks = {
	'juice': 'fruity and sugary',
	'soda': 'bubbly and carbonated',
	'coffee': 'dark and caffeinated'
};

// ### app.route() to simplify routes and avoid duplication ###
var foodsRoute = app.route('/foods');


// no need to put route anymore
// app.get('/foods', function(request, response) {
foodsRoute.get(function(request, response) {
    response.send(Object.keys(foods));		// get foods instead of desc
});


// ### app.param() ####
// intercept param then attach ot to request obj which is accessible throughout
app.param('name', function (request, response, next) {
    // normalize for case-insensitive
    var name = request.params.name;
    var paramName = name.toLowerCase();

    // do other param cleansing here
	request.paramName = paramName;
	next();
});

// app.get('/foods/:name', function (request, response) {

app.get('/foods/:name', function (request, response) {
		var description = foods[request.paramName];	// undefined if not there
		if (!description) {
			response.status(404)
				.json('No desc found for ' + request.params.name);
		} else {
			response.json(description);		// defaults to 200 Success
		}
	})
	.delete('/foods/:name', function (request, response) {
		console.log(request.paramName);
		delete foods[request.paramName];				// could also be request.params.name
		console.log(foods);
		response.sendStatus(200);
	});

// ### we can also do chaining ###


app.get('/drinks/:name', function (request, response) {
    var description = drinks[request.paramName];	// undefined if not there
    if (!description) {
        response.status(404)
            .json('No desc found for ' + request.params.name);
    } else {
        response.json(description);		// defaults to 200 Success
    }
});

//POST
// app.post('/foods', parseUrlEncoded, function (request, response) {
foodsRoute.post(parseUrlEncoded, function (request, response) {
	var newFood = request.body;
	foods[newFood.name] = newFood.description;

	response.status(201)				// 201 CREATED
		.json(newFood.name);
});

app.listen(3001, function() {
	console.log('Listening at 3001');
});