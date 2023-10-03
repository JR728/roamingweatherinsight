const apiKey = "c0e4d96ff5bf292389be86ec1814fea3";
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");
const history = document.getElementById("history-list");

// Initialize an empty array to store search history
const searchHistory = [];

// Function to display search history in the HTML element with id "history-list"
function displayHistory() {
    history.innerHTML = ""; // Clear the history list

    // Loop through each item in the searchHistory array and create list items
    searchHistory.forEach(city => {
        const listItem = document.createElement("li");
        listItem.textContent = city;
        history.appendChild(listItem); // Append the list item to the history list
    });
}

// Add a click event listener to the search button
searchButton.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeatherData(city); // Call a function to fetch and display weather data

        searchHistory.push(city); // Add the searched city to the search history array
        displayHistory(); // Update the displayed search history
    }
});

// Function to asynchronously fetch weather data for a given city
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        const currentWeather = weatherData.list[0];
        const forecast = getDailyForecast(weatherData.list);

        // Display the current weather and forecast
        displayCurrentWeather(currentWeather, weatherData.city.name);
        displayForecast(forecast);
        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to filter and return the daily forecast data
function getDailyForecast(forecastData) {
    return forecastData.filter(day => day.dt_txt.includes("00:00:00"));
}

// Function to display the current weather in the HTML
function displayCurrentWeather(currentWeather, cityName) {
    // Extract data from the currentWeather object
    const date = currentWeather.dt_txt;
    const iconUrl = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    // Create HTML for displaying the current weather
    const currentWeatherHTML = `
    <div class="current-forecast-day">
        <h2>${cityName} - Current Weather</h2>
        <p>Date: ${date}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeed} mph</p>
    <div>
    `;

    currentWeatherDiv.innerHTML = currentWeatherHTML; // Display the HTML in the currentWeatherDiv
}

// Function to display the 5-day weather forecast in the HTML
function displayForecast(forecastData) {
    let forecastHTML = "<h2>5-Day Forecast</h2>";

    // Loop through each day in the forecastData array and create HTML for each day
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

    forecastDiv.innerHTML = forecastHTML; // Display the HTML in the forecastDiv
}
