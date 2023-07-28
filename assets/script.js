const apiKey = "c0e4d96ff5bf292389be86ec1814fea3";
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

searchButton.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const weather = await response.json();
        console.log(weather);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
