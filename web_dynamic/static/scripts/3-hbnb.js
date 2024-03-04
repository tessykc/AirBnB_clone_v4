const request = require("request");

$( document ).ready(function () {
    // Variable to store checked amenities
    const checkedAmenities = {};
  
    // Function to update the h4 tag with checked amenities
    function updateAmenities () {
      const amenitiesList = [];
      // Convert checkedAmenities object into an array of keys (amenity IDs)
      for (const amenityID in checkedAmenities) {
        amenitiesList.push(checkedAmenities[amenityID]);
      }
      // Update the h4 tag text
      $('.amenities h4').text(amenitiesList.join(', '));
    }
  
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
      const amenityID = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
  
      // Check if the checkbox is checked
      if ($(this).is(':checked')) {
        // Store the Amenity ID in the variable
        checkedAmenities[amenityID] = amenityName;
      } else {
        // Remove the Amenity ID from the variable
        delete checkedAmenities[amenityID];
      }
  
      // Update the h4 tag inside the div Amenities with the list of Amenities checked
      updateAmenities();
    });
    fetch('http://0.0.0.0:5001/api/v1/status/')
    let status = "OK"; // Assuming 'status' may change in the script

    if (status === "OK") {
        $('#api_status').addClass("available");
    } else {
        $('#api_status').removeClass("available");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Function to load places from the API
    function loadPlaces() {
        // Clear existing places
        document.querySelector('section.places').innerHTML = '';

        // Send POST request to fetch places
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            // Loop through places and create article tags
            data.forEach(place => {
                const placeArticle = document.createElement('article');
                placeArticle.innerHTML = `
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">${place.description}</div>
                `;
                document.querySelector('section.places').appendChild(placeArticle);
            });
        })
        .catch(error => console.error('Error loading places:', error));
    }

    // Load places when the page is loaded
    loadPlaces();
});
