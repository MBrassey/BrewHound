var todaysDate = moment().format("L");
var searchFormEl = document.querySelector("#input-group");
var cities = {};

var storeCity = function (cityName) {
    // Structure the Cities Array
    var cities = [];
    cities = JSON.parse(localStorage.getItem("city")) || [];

    // Push City to LocalStorage if Not Already Present
    cities.indexOf(cityName) === -1 ? cities.unshift(cityName) : console.log(cityName + " is already stored.");

    // Sanitize JSON
    localStorage.setItem("city", JSON.stringify(cities));
};

var presentStoredCities = function () {
    // Load "storedCities" from LocalStorage
    var storedCities = JSON.parse(localStorage.getItem("city"));
    if (storedCities) {
        // Clear Saved Searches Container
        $("#cityContainer").empty();

        // Present Newest Search on Top
        const reversed = storedCities; //.reverse();

        // Present UpTo 8 Stored Cities
        if (reversed.length < 8) {
            // Present 8 storedCities
            $.each(reversed, function (key, value) {
                $("#cityContainer").append('<div id="' + value + '" class="button is-large is-fullwidth mt-3 drag"><span class="cityButton">' + value + "</span></div>");
            });
        } else {
            var times = 8;
            for (var i = 0; i < times; i++) {
                $("#cityContainer").append('<div id="' + reversed[i] + '" class="button is-large is-fullwidth mt-3 drag"><span class="cityButton">' + reversed[i] + "</span></div>");
            }
        }

        // Make List of All ".cityButton" Elements
        var cityButtons = document.querySelectorAll(".cityButton");

        // Append onClick Listener for Each Saved City Presented
        cityButtons.forEach(function (cityBtn) {
            cityBtn.addEventListener("click", function (event) {
                var loadCity = event.target.innerText;
                if (loadCity) {
                    console.log(loadCity + " was clicked!");
                }
            });
        });
    } else {
        console.log("No Saved Searches!");
    }

    // Make "cityContainer" Buttons Sortable
    $(function () {
        $("#cityContainer").sortable({
            placeholder: "placeHolder",
            connectWith: $(".drag"),
            scroll: false,
            tolerance: "pointer",
            activate: function (event) {
                console.log("activate", this);
                $(this).addClass("dropover");
                $(".bottom-trash").addClass("bottom-trash-drag");
            },
            deactivate: function (event) {
                console.log("deactivate", this);
                $(this).removeClass("dropover");
                $(".bottom-trash").removeClass("bottom-trash-drag");
            },
            over: function (event) {
                console.log("over", event.target);
                $(this).addClass("dropover-active");
            },
            out: function (event) {
                console.log("out", event.target);
                $(this).removeClass("dropover-active");
            },
            update: function () {
                // When User Drops Button, Save New Sort Order to LocalStorage
                var sortedArr = [];
                $(this)
                    .children()
                    .each(function () {
                        var citiesSorted = $(this).find("span").text().trim();
                        sortedArr.push(citiesSorted);
                        console.log(citiesSorted);
                    });

                // Overwrite Previous Array With New Sort Order
                cities = sortedArr;
                localStorage.setItem("city", JSON.stringify(cities));
            },
        });
    });
};

var presentData = function (cityName) {
    // Capture More Data Later
    // Run Store & Present Functions for New City

    if (cityName) {
        storeCity(cityName);
        presentStoredCities(cityName);
    } else {
        presentStoredCities();
    }
};

$("#trash").droppable({
    // Configure Droppable Trash Element Behaviour
    accept: ".drag",
    tolerance: "touch",
    drop: function (event, ui) {
        //console.log("drop");
        ui.draggable.remove();
        $(".bottom-trash").removeClass("bottom-trash-active");
    },
    over: function (event, ui) {
        //console.log("over");
        $(".bottom-trash").addClass("bottom-trash-active");
    },
    out: function (event, ui) {
        //console.log("out")
        $(".bottom-trash").removeClass("bottom-trash-active");
    },
});

var initial = function () {
    // Present any Stored Searches
    presentStoredCities();
};

initial();
