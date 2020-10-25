var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];


    $("#searchBtn").on('click', function(){
        var searchData = $("#searchInput").val().trim();
        console.log(searchData);
        callWeatherTemps(searchData);
    });

    function callWeatherTemps(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a6364729079252b0dc5b1f4530452fb4";
        $.ajax({
            url:queryURL,
            method: "GET",
        }).then(function(response){
            searchHistory.unshift(response.name)
            localStorage.setItem('cities', JSON.stringify(searchHistory))
            displaysearchHistory(searchHistory)
            $("#weather-append").empty();
            var farenheit = (
                (parseInt(response.main.temp - 273.15) *9) / 5 + 32).toFixed();
                var humidity = response.main.humidity + "%";
                var wind = response.main.speed;
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h3>").addClass("card-title").text(response.name + " " + new Date().toLocaleDateString());
                var cardTemp = $("<p>").text("Temperature: " + farenheit);
                var cardHumidity = $("<p>").text("Wind Speed: " + humidity);
                var cardWind = $("<p>").text("Wind Speed: " + wind);
                $("weather-append").append(
                    cardBody,
                    cardTitle,
                    cardTemp,
                    cardHumidity,
                    cardWind);
                    callUVIndex(response.coord.lat, response.coord.lon);
                    callFiveDay(response.coord.lat, response.coord.lon);
                });
            }
                function callUVIndex(lat, lon) {
                    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon-" + lon + "&appid=a6364729079252b0dc5b1f4530452fb4";
                    $.ajax({
                        url:queryURL,
                        method: "GET",
                    }).then(function(response){
                        console.log(response);
                        var uv = response.value;
                        console.log(uv);
                        var cardUV = $("<p>").text("UV Index: " + uv);
                        $("#weather-append").append(cardUV);
                    });
                }
                function callFiveDay (lat, lon) {
                    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat-" + lat + "&lon-" + lon + "&appid=a6364729079252b0dc5b1f4530452fb4";
                    $.ajax({
                        url: queryURL,
                        method: "GET",
                    }).then(function(response){
                        console.log(response);
                        var dayArray =response.daily;
                        for (var i = 0; i <5; i ++){
                            var forecastWeather = dayArray[i+1];
                            var date = new Date(forecastWeather.dt * 1000);
                            console.log(date);
                            var farenheit = ((parseInt(forecastWeather.temp.day - 273.15) * 9) / 5 + 32).toFixed();
                            var cardBody = $("<div>").addClass("card-body");
                            var cardTitle = $('<h3>').addClass("card-title").text(date.toLocaleDateString());
                            var cardTemp = $('<p>').text("Temperature: " + farenheit);
                            $("#fiveday-append").append(cardBody, cardTitle, cardTemp);
                        }
                    });
                }
                function displaysearchHistory(cities){
                    $("#search-history").empty();
                    for (var i = 0; i < cities.length; i++) {
                        let city = cities[i];
                        var li = $("<li>").addClass("list-group-item").text(city);
                        li.on('click', function(){
                            callWeatherTemps(city);
                        })
                    }$("#search-history").append(li);
                }
            displaysearchHistory(searchHistory);

                