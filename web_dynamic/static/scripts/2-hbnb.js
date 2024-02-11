#!/usr/bin/node

$('document').ready(function () {
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
	    if ( $( "#api_status" ).hasClass("available")) {
		$( "#api_status" ).removeClass("available");
	    };
	    console.log("Error", textStatus, errorThrown);
	});
});
