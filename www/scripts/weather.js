var OpenWeatherKey = "3f2010742a2fff2361ec4317ca0db8ca";
var OpenWeatherIconURL = "images/";

function getWeatherWithZipCode() {
    var zipcode = $("#zip-code-input").val();
    var qryStr = "http://api.openweathermap.org/data/2.5/weather?zip=" +
        zipcode + ",us&appid=" + OpenWeatherKey + "&units=imperial";

    $.getJSON(qryStr,
        function(results) {
            showWeatherData(results);
        }).fail(function(jqXHR) {
        $("#error-msg").show();
        $("#error-msg").text("Error retrieving data. " + jqXHR.statusText);
        });

    return false;
}

function showWeatherData(results) {
    if (results.weather.length) {
        $("#error-msg").hide();
        $("#weather-data").show();

        $("#title").text(results.name);
        $("#weather-img").attr("src", OpenWeatherIconURL + results.weather[0].icon + ".png");
        $("#description").text(results.weather[0].description);
        $("#wind-speed").text(results.wind.speed);
        $("#wind-dir").text(results.wind.deg);
        $("#temperature").text(results.main.temp);
        $("#humidity").text(results.main.humidity);
        
        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $("#sunrise").text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $("#sunset").text(sunsetDate.toLocaleTimeString());
    } else {
        $("#weather-data").hide();
        $("#error-msg").show();
        $("#error-msg").text("Error retrieving data.");
    }
}