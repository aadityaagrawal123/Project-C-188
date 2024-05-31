let latitude, longitude, destination;

$(document).ready(function () {
    alert("Please allow the device to know your location!")
    initGeolocation();
})

$(function () {
    $("#navigate-button").click(function () {
        window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`
    })
})

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}

function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude

    // Initializing Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 4
    });

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }).on('result', function(e) {
            destination = e.result.center
        })
    );
    
    // Showing the weather of major places on the map

    // Delhi
    this.show_weather(28.69308718947922, 77.2277467162606, map);

    // Mumbai
    this.show_weather(19.085422054618302, 72.87567493494788, map)

    // Kolkata
    this.show_weather(22.581379318086984, 88.37275424423405, map)

    // Chennai
    this.show_weather(13.086267548384619, 80.28315082242847, map)

    // Ahmedabad
    this.show_weather(23.031532994101187, 72.58865143917798, map)

    // Indore
    this.show_weather(22.72895496477136, 75.85147268827022, map)

    // Guwahti
    this.show_weather(26.110897644690052, 91.70217915967962, map)

    // Jaipur
    this.show_weather(26.91940598769634, 75.79534739019618, map)

    // Lucknow
    this.show_weather(26.848596483935573, 80.94592899340249, map)

    // Ladakh
    this.show_weather(34.521183058051264, 76.1439346612338, map)

}


function show_weather (lati, long, pos) {
    var sunny_icon = document.querySelector("#sunny");
    var cloudy = document.querySelector("#cloudy");
    var partly_cloudy = document.querySelector("#partly-cloudy");
    var light_rain = document.querySelector("#light-rain");
    var heavy_rain = document.querySelector("#heavy-rain");
    var snow = document.querySelector("#snow");
    var night = document.querySelector("#night");
    var thunderstorm = document.querySelector("#thunderstorm");
    var thunderstormWithRain = document.querySelector("#thunderstormRain");
    var haze = document.querySelector("#haze");

    var hours = new Date().getHours()
    var isday = hours > 6 && hours < 19

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=6be9fac2c278d09c65cdb4ae67421c26`,
        type: "get",
        success: function (response) {
           var weather = `${response.weather[0].main}`;
           var weatherDescription = `${response.weather[0].description}`;

           if (weather === 'Thunderstorm' && (weatherDescription === 'light thunderstorm' || weatherDescription === 'thunderstorm' ||weatherDescription === 'heavy thunderstorm' || weatherDescription === 'ragged thunderstorm' || weatherDescription === 'thunderstorm with light drizzle' || weatherDescription === 'thunderstorm with drizzle' || weatherDescription === 'thunderstorm with heavy drizzle'))
            {
                var apiIcon = thunderstorm;
            }
            else if (weather === 'Thunderstorm' && (weatherDescription === 'thunderstorm with light rain' || weatherDescription === 'thunderstorm with rain' ||weatherDescription === 'thunderstorm with heavy rain'))
            {
                var apiIcon = thunderstormWithRain;
            }
            else if (weather === 'Rain')
            {
                var apiIcon = heavy_rain
            }
            else if (weather === 'Drizzle')
            {
                var apiIcon = light_rain
            }
            else if (weather === 'Snow')
            {
                var apiIcon = snow
            }
            else if (weather === 'Clouds' && (weatherDescription === 'few clouds'))
            {
                var apiIcon = partly_cloudy
            }
            else if (weather === 'Clouds' && (weatherDescription != 'few clouds'))
            {
                var apiIcon = cloudy
            }
            else if (weather === 'Clear' && isday)
            {
                var apiIcon = sunny_icon
            }
            else if (weather === 'Clear' && !isday)
            {
                var apiIcon = night
            }
            else if (weather === 'Mist' || weather === 'Snow' || weather === 'Haze' || weather === 'Dust' || weather === 'Fog' || weather === 'Sand' || weather === 'Ash' || weather === 'Squall' || weather === 'Tornado' )
            {
                var apiIcon = haze
            }
                
           var marker = new mapboxgl.Marker({
            element: apiIcon
        })
            .setLngLat([long, lati])
            .addTo(pos);
        }  

    });
}