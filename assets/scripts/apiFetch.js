var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");
var cardContainerEl = document.querySelector("#card-container");
var currentCityEl = document.querySelector("#current-city");
var modal = document.querySelector(".modal");
var close = document.querySelector(".close");
// defines map for google API
let map;
let geocoder;

var city;
var state;

// main body function
function brewerySearch(city, state) {
    axios
        .get("https://api.openbrewerydb.org/breweries?per_page=8&by_city=" + city + "&by_state=" + state + "&sort=-name")
        // Adds the response to brewCards function
        .then((response) => brewCards(response))
        .catch((error) => console.log(error));
}

// Creates cards based on response from API fetch
function brewCards(response) {
    // empties cards
    cardContainerEl.textContent = "";

    for (i = 0; i < response.data.length; i++) {
        const cardEl = document.createElement("div");
        cardEl.className = "card mt-3";
        cardEl.style.textTransform = "capitalize";
        cardEl.setAttribute("data-lat", response.data[i].latitude);
        cardEl.setAttribute("data-lon", response.data[i].longitude);
        cardEl.setAttribute("data-addr", response.data[i].street);

        const cardContent = document.createElement("div");
        cardContent.className = "card-content is-dark";
        // need to add element to change background photo
        cardEl.appendChild(cardContent);

        const brewNameEl = document.createElement("p");
        brewNameEl.className = "subtitle mt-5";
        brewNameEl.textContent = response.data[i].name;
        cardContent.appendChild(brewNameEl);

        const footerEl = document.createElement("footer");
        footerEl.className = "card-footer";

        const breweryType = document.createElement("p");
        breweryType.classList = "card-footer-item brew-name";
        breweryType.textContent = response.data[i].brewery_type;
        footerEl.appendChild(breweryType);

        const favoriteEl = document.createElement("a");
        favoriteEl.className = "card-footer-item";
        favoriteEl.setAttribute("href", "#");
        favoriteEl.textContent = "save";

        footerEl.appendChild(favoriteEl);
        cardEl.appendChild(footerEl);
        cardContainerEl.appendChild(cardEl);
    }
}

// event listener for cards
function showMap(event) {
    // makes sure parent element has card class
    if (event.target.closest(".card")) {
        // parses the data attribute for latitude and longitude to a float
        var dataLat = parseFloat(event.target.closest(".card").getAttribute("data-lat"));
        var dataLon = parseFloat(event.target.closest(".card").getAttribute("data-lon"));
        var dataAddr = event.target.closest(".card").getAttribute("data-addr");
        var fullAddr = dataAddr + ", " + city + ", " + state;

        // checks to see if there are null values for lat and longitude.
        if (isNaN(dataLat) || isNaN(dataLon)) {
            // if there are null lat/lon values, checks to see if there's a blank address value
            if (dataAddr == "") {
                // cannot pull map due to no data
                console.log("Sorry we can't get that map");
                // runs map using street address rather than lat/lon
            } else {
                // sets map to 0, 0 because there's a NaN value in the lat/lon
                initMap(0, 0);
                // gets geocode location based on address
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: fullAddr }, function (results) {
                    // reassigns google map
                    if (results[0]) {
                    map.setCenter(results[0].geometry.location);
                    } else {
                        console.log("Nothing Selected.");
                    }

                });
            }
            // runs map normally
        } else {
            initMap(dataLat, dataLon);
        }
    }
}

// Creates map based on brewData values
function initMap(latitude, longitude) {
    // tries lat and lon first by seeing if there's no address value
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 18,
    });
}

// submit handler to start main script body
var formSubmitHandler = function (event) {
    event.preventDefault();
    city = cityNameEl.value.trim();
    state = stateNameEl.value.trim();

    // formats text to work better with local storage
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    var state = state.charAt(0).toUpperCase() + state.slice(1);

    // runs local storage from script.js file when submit handler is ran
    if ((cityName && state)) {
        presentData(cityName + ", " + state);
        cityNameEl.value = "";
    } else {
        modal.style.display = 'block';
    }

    // runs main bods of script
    if ((city && state)) {
        console.log(city, state);
        // Updates current city text
        currentCityEl.textContent = city + ", " + state;
        currentCityEl.style.textTransform = "capitalize";
        brewerySearch(city, state);
        // Empties search parameters
        cityNameEl.value = "";
        stateNameEl.value = "";
    } else {
        modal.style.display = 'block';
    }
};

// event listener to run on submit click
inputEL.addEventListener("submit", formSubmitHandler);
cardContainerEl.addEventListener("click", showMap);
close.addEventListener('click', function () { 
modal.style.display = 'none' 
}); 
