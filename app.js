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


app.get('/foods', function(request, response) {
	var foods = ['banana', 'fries', 'bbq'];
	response.send(foods);
});

app.listen(3001, function() {
	console.log('Listening at 3001');
});