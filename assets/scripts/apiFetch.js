var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");

// defines map for google API
let map;


// main body function
function brewerySearch(city, state) {
    axios.get("https://api.openbrewerydb.org/breweries?per_page=8&by_city=" + city + "&by_state=" + state + "&sort=-name")
        .then(response => brewData(response))
        .catch(error => console.log(error));
}

// Allows data to be used in HTML
function brewData(response) {
    console.log(response.data);
    parsedLat = parseFloat(response.data[0].latitude);
    parsedLon = parseFloat(response.data[0].longitude);
    initMap(parsedLat, parsedLon)
}


// Creates map based on brewData values
function initMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 18
    });
}

// submit handler to start main script body
var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityNameEl.value;
    var state = stateNameEl.value;

    if ((city, state)) {
        console.log(city, state);
        brewerySearch(city, state);
        cityNameEl.value = "";
        stateNameEl.value = "";
    } else {
        alert("Please enter a city and state");
    }
};


// event listener to run on submit click
inputEL.addEventListener("submit", formSubmitHandler);
