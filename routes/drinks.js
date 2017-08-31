/**
 * Created by lenny on 8/30/2017.
 */

var express = require('express');
var router = express.Router();          // returns router instance which can be mounted as a middleware


var drinks = {
    'juice': 'fruity and sugary',
    'soda': 'bubbly and carbonated',
    'coffee': 'dark and caffeinated'
};


module.exports = router;            // export router as Node module