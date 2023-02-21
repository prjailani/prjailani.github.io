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
var STOP_NAME = prompt("Enter your stop name: ");
const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${STOP_NAME}&key=${API_KEY}`;

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const location = data.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;
    
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  })
  .catch(error => {
    console.error(error);
  });
