#!/usr/bin/node

$(document).ready(function () {
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        $('.amenities H4').text(Object.values(amenities).join(', '));
    });

    $.get("http://0.0.0.0:5001/api/v1/status")
    .done(function (data) {
        console.log(data);
        $( "#api_status" ).addClass("available");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $( "#api_status" ).removeClass("available");
        console.log("Error", textStatus, errorThrown);
    });

    const obj = {};
    const jsonString = JSON.stringify(obj);
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        dataType: "json",
    })
    .done(function(json) {
        console.log(json[0]);
        $( ".places" ).append(json.map(function (dt) {
	    var guests;
	    var number_rooms;
	    var number_bathrooms;

	    if (dt.max_guest === 1) {
		guests = "Guest";
	    } else {
		guests = "Guests";
	    }
	    console.log(Object.keys(dt).join(","))
	    if (dt.number_rooms === 1) {
		number_rooms = "Bedroom";
	    } else {
		number_rooms = "Bedrooms";
	    }
	    if (dt.number_bathrooms === 1) {
		number_bathrooms = "Bathroom";
	    } else {
		number_bathrooms = "Bathrooms";
	    }
            return (`<article>
<div class="title_box">
<h2>${dt.name}</h2>
<div class="price_by_night">${dt.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${dt.max_guest} ${guests}</div>
<div class="number_rooms">${dt.number_rooms} ${number_rooms}</div>
<div class="number_bathrooms">${dt.number_bathrooms} ${number_bathrooms}</div>
</div>
<div class="description">${dt.description}</div>
</article>
                    </article>`);
        }));
    });
});
