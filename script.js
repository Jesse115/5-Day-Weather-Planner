for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".listing").addClass("list");

    cityName.append("<li>" + city + "</li>");
}

var searchButton = $(".button");

var apiKey = "f78e12318a490d9e7d83c0b7d04a67b7";

var keyCount = 0;
searchButton.click(() => {

    var userInput = $(".input").val();
    var today = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&Appid=" + apiKey + "&units=imperial";

    if (userInput == "") {
        console.log(userInput);
    } else {
        $.ajax({
            url: today,
            method: "GET"
        }).then((response) => {
            var cityName = $(".list-group").addClass("list");
            cityName.append("<li>" + response.name + "</li>");
            keyCount = keyCount + 1;
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");

            currentCard.append(currentName);
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=f78e12318a490d9e7d83c0b7d04a67b7=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });

        });

        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            day.forEach((i) => {
                var UTC1 = new Date(response.list[i].dt * 1000);
                UTC1 = UTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=cardColor>" + "<p>" + UTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

            })

        });
    }
});




