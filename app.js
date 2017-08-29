var express = require('express');
var app = express();

app.get('/', function(request, response) {
	response.send('Hello world');
	
	// in pure Node
	// response.write('Hello world');
	// response.end();
});

// send converts appropriately to json or html, etc
app.get('/foods', function(request, response) {
	var foods = ['banana', 'fries', 'bbq'];
	response.send(foods);
});

// response.json() for pure JSON
app.get('/foods_html', function(request, response) {
	response.send('<div>hehey</div>');
});

// response.json() for pure JSON
app.get('/foods2', function(request, response) {
	var foods = ['banana', 'fries', 'bbq'];
	response.json(foods);
});

// regular redirect - 302 Moved Temporarily
app.get('/yum', function(request, response) {
	response.redirect('/foods');
});

// regular redirect - 301 Moved Permanently
app.get('/yum2', function(request, response) {
	response.redirect(301, '/foods');
});

app.listen(3001, function() {
	console.log('Listening at 3001');
});