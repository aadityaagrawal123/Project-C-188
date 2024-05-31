let coordinates = {}

$(document).ready(function () {
    get_coordinates();
    get_weather();
})

function get_coordinates() {
    let searchParams = new URLSearchParams(window.location.search)
    
    if (searchParams.has('source') && searchParams.has('destination')) {
        let source = searchParams.get('source')
        let destination = searchParams.get('destination')
        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lon = source.split(";")[1]
        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lon = destination.split(";")[1]
    } else {
        alert("Coordinates not selected!")
        window.history.back();
    }
}

function get_weather () {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=6be9fac2c278d09c65cdb4ae67421c26`,
        type: "get",
        success: function (response) {
            let name = response.name;
            let weather = response.weather[0].main;
            let temp = `${Math.floor(parseInt(response.main.temp) - 273.15)}\u00B0C`;

            let textEl = `The Weather of ${name} - Weather Type: ${weather}, Temperature: ${temp}`;
            console.log(textEl);

            $("#scene_container").append(
                `
                <a-entity gps-entity-place="latitude: ${coordinates.destination_lat}; longitude: ${coordinates.destination_lon};" >
                    <a-entity><a-text height="50" value=${textEl}></a-text></a-entity>
                </a-entity>
                `
            );
        }
    });
}