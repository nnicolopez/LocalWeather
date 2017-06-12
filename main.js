/**
 * Created by nico on 5/17/17.
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showWeather(pos) {
    var crd = pos.coords;
    getWeather(crd.latitude, crd.longitude);
}

/**
 * getting weather statistics from openweather
 * this way works without secure conection localy
 *
 */
function getWeather(lat, lon) {
    $.ajaxSetup({ cache: false });
    console.log(lat, lon);
    $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +
              '&units=metric' +
              '&id=524901&APPID=ec85692ed20a36b5820591de985da267', renderWeather);
}
function renderWeather(obj) {
    console.log(obj);
    var wInfo = {
        city: obj.name,
        country: obj.sys.country,
        temp: obj.main.temp,
        humidity: obj.main.humidity,
        pressure: obj.main.pressure,
        weather: obj.weather[0].description,
        icon: '"http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png"',
        wind: obj.wind
}

    // console.log(city, temp, humidity, pressure, weather, wind.speed, wind.deg, icon);

    //put the city into the h3 tag
    $(".myCity").html(wInfo.city + ', ' + wInfo.country);

    //render climate info
    $(".myWeather").html('<p>' + wInfo.weather + '</p><img src=' + wInfo.icon + '>');
    $(".myTemp").append('<p class="celcius">' + wInfo.temp + '°C</p>' +
                        '<p class="fahrenheit hidden">' + Math.floor(9/5*wInfo.temp + 32) + 'F</p>');
    $(".myHumidity").append('<p>' + wInfo.humidity + '%</p>');
    $(".myPressure").append('<p>' + wInfo.pressure + 'hPa</p>');
    $(".myWind").append('<p>' + wInfo.wind.speed + 'km/h, ' + Math.floor(wInfo.wind.deg) + '°</p>');
    $(".myWeatherWindow").removeClass("hidden");



    /*
     {"coord":{"lon":139,"lat":35},
     "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
     "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
     "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
     "wind":{"speed":7.31,"deg":187.002},
     "rain":{"3h":0},
     "clouds":{"all":92},
     "dt":1369824698,
     "id":1851632,
     "name":"Shuzenji",
     "cod":200}
    * */
}

/**
 *
 *
 */


$(document).ready(function() {

    getLocation();

    //HERE WILL TOGGLE TEMPERATURE UNIT
    $(".toggleTemp").click(function () {
        $(".celcius").toggleClass("hidden");
        $(".fahrenheit").toggleClass("hidden");
    })
});