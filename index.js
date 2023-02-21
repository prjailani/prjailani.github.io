navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  
    console.log("Initial location: " + lat + ", " + lng);
  
    navigator.geolocation.watchPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
  
      console.log("Updated location: " + lat + ", " + lng);
    });
  });

const API_KEY = "AIzaSyBdmF37Lbgn623YZYckDGPZMqYAHnhDFMQ";

const stopName = prompt("Enter a stop name:");

const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${stopName}&key=${API_KEY}`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const matches = data.results;
    
    console.log(`Available options for "${stopName}":`);
    matches.forEach(match => {
      console.log(`- ${match.formatted_address}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
