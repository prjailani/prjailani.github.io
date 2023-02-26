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

// const API_KEY = "AIzaSyBdmF37Lbgn623YZYckDGPZMqYAHnhDFMQ";

// const stopName = prompt("Enter a stop name:");

// const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${stopName}&key=${API_KEY}`;

// fetch(URL)
//   .then(response => response.json())
//   .then(data => {
//     const matches = data.results;
    
//     console.log(`Available options for "${stopName}":`);
//     matches.forEach(match => {
//       console.log(`- ${match.formatted_address}`);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

 function initAutocomplete() {
      const addressInput = document.getElementById('address-input');
      const searchBox = new google.maps.places.SearchBox(addressInput);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        const address = places[0].formatted_address;
        const lat = places[0].geometry.location.lat();
        const lng = places[0].geometry.location.lng();
        console.log(`Address: ${address}, Latitude: ${lat}, Longitude: ${lng}`);
      });

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