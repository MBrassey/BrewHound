var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");

// defines map for google API
let map;


// main body function
function brewerySearch(city, state) {
    axios.get("https://api.openbrewerydb.org/breweries?per_page=8&by_city=" + city + "&by_state=" + state + "&sort=-name")
        // Adds the response.data to brewData function
        .then(response => brewData(response.data))
        .catch(error => console.log(error));
}

// Allows data to be used in HTML by using the response from fetch
function brewData(response) {
    brewCards(response)

    // will turn map function to event listener later
    parsedLat = parseFloat(response.data[0].latitude);
    parsedLon = parseFloat(response.data[0].longitude);
    initMap(parsedLat, parsedLon)
}


// Creates cards based on response from API fetch
function brewCards(response) {
    console.log(response.data)
    /* 
    Needs to create 8 card elements in the "Current City" box that can be clickable to show a map
    Cards will have to contain data-* values to match latitude and longitude in order to pipe it into the Gmap 
    */
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
