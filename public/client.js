$(function() {
	$.get('/foods', getFoodsCallBack);

	function getFoodsCallBack(data) {
	    var listHTML = [];
	    for(var i in data) {

	        // create HTML element and assign text attrib
	        listHTML.push($('<li>', { text: data[i] } ));
        }
        $('#foods').append(listHTML);
    }
});