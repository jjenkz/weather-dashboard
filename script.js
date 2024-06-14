// to get the temperature, humidity and wind speed: use list.main.temp(imperial:fahrenheit), list.main.humidity and list.wind.speed

// store the form data into local storage and retrieve it

document
  .getElementById("search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let city = document.getElementById("search-input").value;
    if (city) {
      saveSearch(city);
      fetchCoordinates(city);
    }
  });

function saveSearch(city) {
  let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];
  if (!searches.includes(city)) {
    searches.push(city);
    localStorage.setItem("weatherSearches", JSON.stringify(searches));
    displaySearchHistory();
  }
}

function displaySearchHistory() {
  const historyContainer = document.getElementById("history");
  historyContainer.innerHTML = " ";
  let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];
  searches.forEach((city) => {
    const searchItemEl = document.createElement("button");
    searchItemEl.classList.add(
      "list-group-item",
      "list-group-item-action",
      "search-button"
    );
    searchItemEl.textContent = city;
    searchItemEl.addEventListener("click", function () {
      fetchCoordinates(city);
    });
    historyContainer.appendChild(searchItemEl);
  });
}

function fetchCoordinates(city) {
  const apiKey = "e6dfe8b0f0462fe603d660cc1de7b7e0";
  const requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}";

  fetch(requestUrl)
    .then((response) => response.JSON())
    .then((data) => {
      if (data.length === 0) {
        alert("Not in the database");
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;
      fetchWeather(lat, lon, data[0].name);
    })
    .catch((error) => console.error("Invalid coordinates:", error));
}

function fetchWeather(lat, lon, cityName) {
  const apiKey = "e6dfe8b0f0462fe603d660cc1de7b7e0";
  const requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}";

  fetch(requestUrl)
    .then((response) => response.JSON())
    .then((data) => displayWeather(data, cityName))
    .catch((error) => console.error("Can't get weather data", error));
}

function displayWeather(data, cityName) {
  const todaySection = document.getElementById("today");
  const forecastSection = document.getElementById("forecast");
  todaySection.innerHTML = " ";
  forecastSection.innerHtml = " ";

  const currentWeather = data.list[0];
  const iconUrl =
    "https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png";
  const fahrenheit = (currentWeather.main.temp * 9) / 5 + 32;
  const todayDivEl = document.createElement("div");
  todayDivEl.classList.add("weather-day");
  todayDivEl.innerHTML = ` 
    <h2>Weather in ${cityName}</h2>
    <h3>${new Date(currentWeather.dt * 1000).toLocaleDateString()}</h3>
    <img class="weather-icon" src="${iconUrl}" alt="${
    currentWeather.weather[0].description
  }">
        <p>Temp: ${fahrenheit.toFixed(1)} °F</p>
        <p>Weather: ${currentWeather.weather[0].description}</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>`;

  todaySection.appendChild(todayDivEl);

  const forecast = data.list.slice(0, 5);
  forecast.forEach((day) => {
    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    const fahrenheit = (day.main.temp * 9) / 5 + 32;
    const dayDivEl = document.createElement("div");
    dayDivEl.classList.add("weather-day", "col");
    dayDivEl.innerHTML = `
    <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
    <img  class="weather-icon" src="${iconUrl}" alt="${
      day.weather[0].description
    }">
    <p>Temp: ${fahrenheit.toFixed(1)}  °F </p>
    <p>Weather: ${day.weather[0].description}</p>
    <p>Humidity: ${day.main.humidity}%</p>
    <p>Humidity: ${day.main.humidity}%</p>`;

    forecastSection.appendChild(dayDivEl);
  });
}

document.addEventListener("DOMContentLoaded", displaySearchHistory);
