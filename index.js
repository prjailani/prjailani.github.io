let lat1;
let lng1;

navigator.geolocation.getCurrentPosition(function(position) {
  lat1 = position.coords.latitude;
  lng1 = position.coords.longitude;

  console.log("Initial location: " + lat1 + ", " + lng1);

  navigator.geolocation.watchPosition(function(position) {
    lat1 = position.coords.latitude;
    lng1 = position.coords.longitude;

    console.log("Updated location: " + lat1 + ", " + lng1);
  });
});

function initAutocomplete() {
  const addressInput = document.getElementById('address-input');

  addressInput.addEventListener('input', () => {
    const input = addressInput.value;
    if (input.length > 2) {
      const url = `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const suggestions = data.map(item => item.display_name);
          showSuggestions(suggestions);
        })
        .catch(error => console.log(error));
    }
  });

  function showSuggestions(suggestions) {
    const suggestionList = document.getElementById('suggestion-list');
    suggestionList.innerHTML = '';
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      li.addEventListener('click', () => {
        addressInput.value = suggestion;
        suggestionList.innerHTML = '';
      });
      suggestionList.appendChild(li);
    });
  }

  document.addEventListener('click', event => {
    const suggestionList = document.getElementById('suggestion-list');
    if (!suggestionList.contains(event.target)) {
      suggestionList.innerHTML = '';
    }
  });
}
function latlon() {
  const location = document.querySelector("#address-input").value;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
  var lat1, lng1, lat2, lng2;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      lat2 = data[0].lat;
      lng2 = data[0].lon;
      console.log(`Latitude: ${lat2}, Longitude: ${lng2}`);

      navigator.geolocation.getCurrentPosition(function(position) {
        lat1 = position.coords.latitude;
        lng1 = position.coords.longitude;

        console.log("Initial location: " + lat1 + ", " + lng1);

        navigator.geolocation.watchPosition(function(position) {
          lat1 = position.coords.latitude;
          lng1 = position.coords.longitude;

          console.log("Updated location: " + lat1 + ", " + lng1);

          console.log(distance(lat1, lng1, lat2, lng2));
        });
      });
    })
    .catch(error => console.error(error));

    function distance(lat1, lng1, lat2, lng2) {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = lat1 * Math.PI / 180; // Convert lat1 to radians
      const φ2 = lat2 * Math.PI / 180; // Convert lat2 to radians
      const Δφ = (lat2 - lat1) * Math.PI / 180; // Difference in latitudes
      const Δλ = (lng2 - lng1) * Math.PI / 180; // Difference in longitudes
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
      return (R * c) / 1000; // Convert to kilometers
    }
    
}

var submitButton = document.getElementById("submit");
submitButton.addEventListener("click", latlon);


var submitButton = document.getElementById("submit");
submitButton.addEventListener("click",latlon);