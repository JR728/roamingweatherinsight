const apiKey = "c0e4d96ff5bf292389be86ec1814fea3";
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const currentWeatherDiv = document.getElementById("current-weather");

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
        const weatherData = await response.json();
        const currentWeather = weatherData.list[0];
        
        displayCurrentWeather(currentWeather, weatherData.city.name);
        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

}
function displayCurrentWeather(currentWeather, cityName) {
    const date = currentWeather.dt_txt;
    const iconUrl = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    const currentWeatherHTML = `
        <h2>${cityName} - Current Weather</h2>
        <p>Date: ${date}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeed} mph</p>
    `;

    currentWeatherDiv.innerHTML = currentWeatherHTML;
}

