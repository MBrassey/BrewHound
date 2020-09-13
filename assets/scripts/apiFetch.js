var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");


function brewerySearch(city, state) {
    window.brewName = [];
    axios({
        method: "GET",
        url:
            "https://api.openbrewerydb.org/breweries?per_page=8&by_city=" +
            city +
            "&by_state=" +
            state +
            "&sort=-name&",
        headers: {
            "content-type": "application/json",
        },
    })
        .then((response) => {
            for (i = 0; i < response.data.length; i++) {
                var searchTerm = response.data[i].name;
                brewName.push(searchTerm)
            }
            console.log(brewName);
            locationSearch(
                response.data[0].city,
                response.data[0].latitude,
                response.data[0].longitude
            );
        })
        .catch((error) => {
            console.log(error);
        });
}

function locationSearch(city, lat, lon) {
    axios({
        method: "GET",
        url:
            "https://developers.zomato.com/api/v2.1/locations?query=" +
            city +
            "&lat=" +
            lat +
            "&lon=" +
            lon,
        headers: {
            "user-key": "fbb75db1bb45da2de29201a9a3f9cead",
            "content-type": "application/json",
        },
    })
        .then((response) => {
            entityID = response.data.location_suggestions[0].entity_id;
            entityType = response.data.location_suggestions[0].entity_type;
            for (i = 0; i < brewName.length; i++) {
                restaurantSearch(
                    entityID,
                    entityType,
                    brewName[i]
                )
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function restaurantSearch(cityID, locationType, term) {
    axios({
        method: "GET",
        url:
            "https://developers.zomato.com/api/v2.1/search?entity_id=" +
            cityID +
            "&entity_type=" +
            locationType +
            "&q=" +
            term,
        headers: {
            "user-key": "fbb75db1bb45da2de29201a9a3f9cead",
            "content-type": "application/json",
        },
    })
        .then((response) => {
            console.dir(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

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

inputEL.addEventListener("submit", formSubmitHandler);