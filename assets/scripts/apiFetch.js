var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");
var cardContainerEl = document.querySelector("#card-container")
var currentCityEl = document.querySelector("#current-city")

// defines map for google API
let map;


// main body function
function brewerySearch(city, state) {
    axios.get("https://api.openbrewerydb.org/breweries?per_page=8&by_city=" + city + "&by_state=" + state + "&sort=-name")
        // Adds the response to brewCards function
        .then(response => brewCards(response))
        .catch(error => console.log(error));
}

// Creates cards based on response from API fetch
function brewCards(response) {
    // empties cards
    cardContainerEl.textContent = "";

    for (i = 0; i < response.data.length; i++) {
        const cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.setAttribute("data-lat", response.data[i].latitude);
        cardEl.setAttribute("data-lon", response.data[i].longitude)

        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
        // need to add element to change background photo
        cardEl.appendChild(cardContent);

        const breweryType = document.createElement("p");
        breweryType.classList = "subtitle mt-5";
        breweryType.textContent = response.data[i].brewery_type;
        cardContent.appendChild(breweryType);

        const footerEl = document.createElement("footer");
        footerEl.className = "card-footer";

        const brewNameEl = document.createElement("p");
        brewNameEl.className = "card-footer-item";
        brewNameEl.textContent = response.data[i].name;
        footerEl.appendChild(brewNameEl);

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
    if (event.target.closest('.card')) {
        // parses the data attribute for latitude and longitude to a float
        var dataLat = parseFloat((event.target.closest('.card').getAttribute("data-lat")));
        var dataLon = parseFloat((event.target.closest('.card').getAttribute("data-lon")));
        // applies float data to initMap()
        initMap(dataLat, dataLon)
    }
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
    var city = cityNameEl.value.trim();
    var state = stateNameEl.value.trim();

    // formats text to work better with local storage
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    // runs local storage from script.js file when submit handler is ran
    if (cityName) {
        presentData(cityName);
        cityNameEl.value = "";
    } else {
        alert("Please enter a City");
    }

    // runs main bods of script
    if ((city, state)) {
        console.log(city, state);
        // Updates current city text
        currentCityEl.textContent = city + ", " + state;
        brewerySearch(city, state);
        // Empties search parameters
        cityNameEl.value = "";
        stateNameEl.value = "";
    } else {
        alert("Please enter a city and state");
    }
};


// event listener to run on submit click
inputEL.addEventListener("submit", formSubmitHandler);
cardContainerEl.addEventListener("click", showMap);