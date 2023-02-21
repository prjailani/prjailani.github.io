// Get the user's current position
navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  
    // Display the initial location
    console.log("Initial location: " + lat + ", " + lng);
  
    // Update the location in real-time
    navigator.geolocation.watchPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
  
      // Display the updated location
      console.log("Updated location: " + lat + ", " + lng);
    });
  });
  