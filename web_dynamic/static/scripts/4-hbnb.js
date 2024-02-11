$(document).ready(function () {
    let amenities = {};

    fetchPlaces(JSON.stringify({}));
    status()

    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));

	$.ajax({
	    url: "http://0.0.0.0:5001/api/v1/amenities",
	    type: "GET",
	    contentType: "application/json",
	    dataType: "json",
	}).done(x => {
	    const all_values = Object.values(amenities);
	    let all_amenities = [];
	    x.map(obj => {
		all_values.indexOf(obj.name) !== -1 ? all_amenities.push(obj.id) : console.log("Not found");
	    })
	    const jsonString = JSON.stringify({ 'amenities': all_amenities});
	    fetchPlaces(jsonString);
	    status();

	}).fail(function () {
	    status();
	});


        /*const jsonString = JSON.stringify({ 'amenities': Object.values(amenities) });
        fetchPlaces(jsonString);*/
    });

    function fetchPlaces(jsonString) {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            data: jsonString,
            contentType: "application/json",
            dataType: "json",
        }).done(function(json) {
            displayPlaces(json);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
	    status()
        });
    }

    function displayPlaces(places) {
        $(".places").empty();
        places.forEach(function (place) {
            let guests = (place.max_guest === 1) ? "Guest" : "Guests";
            let number_rooms = (place.number_rooms === 1) ? "Bedroom" : "Bedrooms";
            let number_bathrooms = (place.number_bathrooms === 1) ? "Bathroom" : "Bathrooms";

            let html = `
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} ${guests}</div>
                        <div class="number_rooms">${place.number_rooms} ${number_rooms}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} ${number_bathrooms}</div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>`;
            $(".places").append(html);
        });
    }

    function status () {
	$.ajax({
	    url: "http://0.0.0.0:5001/api/v1/status",
	    type: "GET",
	    contentType: "application/json",
	    dataType: "json",
	})
            .done(function (data) {
		console.log(data);
		$("#api_status").addClass("available");
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
		console.error("Error:", textStatus, errorThrown);
		$("#api_status").removeClass("available");
            });
    };
});
