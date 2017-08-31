var express = require('express');
var app = express();

app.use(express.static('public'));

var foods = require('./routes/foods');
var drinks = require('./routes/drinks');

app.use('/foods', foods);			// ALL requests to /foods are dispatched to the foods router
									// i.e. router is mounted in a particular "root url"
app.use('/drinks', drinks);

app.listen(3001, function() {
	console.log('Listening at 3001');
});