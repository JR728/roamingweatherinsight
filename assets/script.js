const apiKey = "c0e4d96ff5bf292389be86ec1814fea3";
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");

searchButton.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        const currentWeather = weatherData.list[0];
        const forecast = getDailyForecast(weatherData.list);

        displayCurrentWeather(currentWeather, weatherData.city.name);
        displayForecast(forecast);
        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

}
function getDailyForecast(forecastData) {

    return forecastData.filter(day => day.dt_txt.includes("00:00:00"));
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
function displayForecast(forecastData) {
    let forecastHTML = "<h2>5-Day Forecast</h2>";
    
    forecastData.forEach(day => {
        const date = new Date(day.dt_txt);
        const iconUrl = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        const temperature = day.main.temp;
        const humidity = day.main.humidity;
        const windSpeed = day.wind.speed;
        forecastHTML += `
        <div class="forecast-day">
            <p>Date: ${date.toDateString()}</p>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>Temperature: ${temperature} °F</p>
            <p>Humidity: ${humidity} %</p>
            <p>Wind Speed: ${windSpeed} mph</p>
        </div>
    `;
});

forecastDiv.innerHTML = forecastHTML;
}
