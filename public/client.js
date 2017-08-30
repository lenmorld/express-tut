$(function() {
	// $.get('/foods', getFoodsCallBack);
	$.get('/foods', appendToList);

    // function getFoodsCallBack(data) {
	 //    var listHTML = [];
	 //    for(var i in data) {
	 //        // create HTML element and assign text attrib
	 //        listHTML.push($('<li>', { text: data[i] } ));
    //     }
    //     $('#foods').append(listHTML);
    // }


    function appendToList(foods) {
        var listHTML = [];
        var content, food;
        for (var i in foods) {
            food = foods[i];
            content = '<a href="/foods/' + food + '">' + food + '</a>' + '<a href="#" data-food="' + food + '">&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></a>';
            listHTML.push($('<li>', { html: content }));
        }

        $('#foods').append(listHTML);
    }

    // form listener
	$('form').on('submit', function (event) {
		event.preventDefault();		// prevent form from being immediately submitted
		var form = $(this);
		var foodData = form.serialize();  // form data to url-encoded
		console.log(foodData);

		// POST request
		$.ajax({
			type: 'POST',
			url: '/foods',
			data: foodData
		}).done(function(foodName) {
			appendToList([foodName]);
		});
    });


    // DELETE listener
	$('#foods').on('click', 'a[data-food]', function (event) {
		if (!confirm('Are you sure?')) {
			return false;
		}

		var target = $(event.currentTarget);		// link elem that was clicked

		$.ajax({
			type: 'DELETE',
			url: '/foods/' + target.data('food')			// get food name from link's [data-food] attrib
		}).done(function() {
			target.parents('li').remove();				// remove ul of link using parent
		});
    });


});