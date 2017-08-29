var express = require('express');
var app = express();


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

// /foods?limit=2
app.get('/foods', function(request, response) {
    var foods = ['banana', 'fries', 'bbq'];
    if (request.query.limit >= 0) {
		response.json(foods.slice(0, request.query.limit))
	} else {
        response.send(foods);
    }
});

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


// JSON object route
// Object.keys()
app.get('/foods', function(request, response) {
    response.send(Object.keys(foods));		// get foods instead of desc
});

// full obj
app.get('/foods_complete', function(request, response) {
    response.send(foods);		// get foods instead of desc
});


// Dynamic Routes (all other are static)
// foods/banana
// app.get('/foods/:name', function (request, response) {
// 	var description = foods[request.params.name];	// undefined if not there
// 	if (!description) {
// 		response.status(404)
// 			.json('No desc found for ' + request.params.name);
// 	} else {
//         response.json(description);		// defaults to 200 Success
//     }
// });


// improvement

// app.get('/foods/:name', function (request, response) {
//
// 	// normalize for case-insensitive
// 	var name = request.params.name;
// 	var food = name.toLowerCase();
//     var description = foods[food];	// undefined if not there
//
// 	if (!description) {
// 		response.status(404)
// 			.json('No desc found for ' + request.params.name);
// 	} else {
// 		response.json(description);		// defaults to 200 Success
// 	}
// });
//
// app.get('/drinks/:name', function (request, response) {
//
//     // normalize for case-insensitive
//     var name = request.params.name;
//     var drink = name.toLowerCase();
//     var description = drinks[drink];	// undefined if not there
//
//     if (!description) {
//         response.status(404)
//             .json('No desc found for ' + request.params.name);
//     } else {
//         response.json(description);		// defaults to 200 Success
//     }
// });


// improvement2

// intercept param then attach ot to request obj which is accessible throughout
app.param('name', function (request, response, next) {
    // normalize for case-insensitive
    var name = request.params.name;
    var paramName = name.toLowerCase();

    // do other param cleansing here
	request.paramName = paramName;
	next();
});

app.get('/foods/:name', function (request, response) {
    var description = foods[request.paramName];	// undefined if not there
	if (!description) {
		response.status(404)
			.json('No desc found for ' + request.params.name);
	} else {

		response.jso
		response.json(description);		// defaults to 200 Success
	}
});

app.get('/drinks/:name', function (request, response) {
    var description = drinks[request.paramName];	// undefined if not there
    if (!description) {
        response.status(404)
            .json('No desc found for ' + request.params.name);
    } else {
        response.json(description);		// defaults to 200 Success
    }
});



app.listen(3001, function() {
	console.log('Listening at 3001');
});