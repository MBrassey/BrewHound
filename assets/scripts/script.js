var logCity = function (userCity) {
    console.log(userCity);
}

var geoLocate = function () {
    // Geo Locate User's City Without User Interaction
    console.log("User Info:");
    $.get(
        "https://ipinfo.io",
        function (response) {
            logCity(response.city);
        },
        "jsonp"
    );
};

geoLocate();