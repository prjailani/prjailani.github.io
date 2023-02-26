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
  const location = document.querySelector("#address-input");
  const jsonvalues = `https://nominatim.openstreetmap.org/search/${location}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
  console.log($.getJSON(jsonvalues[0]));
}
var submitButton = document.getElementById("submit");
submitButton.addEventListener("click",latlon);