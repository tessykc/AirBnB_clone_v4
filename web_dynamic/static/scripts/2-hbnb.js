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