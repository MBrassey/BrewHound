
var cityNameEl = document.querySelector("#city-name");
var stateNameEl = document.querySelector("#state-name");
var inputEL = document.querySelector("#input-group");


function brewerySearch(city, state) {
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
            console.log(response.data);
            for (i = 0; i < response.data.length; i++)
                restaurantSearch(
                    response.data[i].name,
                    response.data[i].latitude,
                    response.data[i].longitude
                );
        })
        .catch((error) => {
            console.log(error);
        });
}

function restaurantSearch(term, lat, lon) {
    axios({
        method: "GET",
        url:
            "https://developers.zomato.com/api/v2.1/search?q=" +
            term +
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
            console.log(response.data.restaurants[0].restaurant.name);
        })
        .catch((error) => {
            console.log(error);
        });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityNameEl.value;
    var state = stateNameEl.value;
    

    if (city, state) {
        console.log(city, state);
        brewerySearch(city, state);
        cityNameEl.value = "";
        stateNameEl.value = "";
        
        

    }
    else{
        alert("Please enter a city and state");
    }
};



inputEL.addEventListener("submit", formSubmitHandler);


