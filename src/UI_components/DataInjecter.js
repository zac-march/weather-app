import { getWeatherData } from "../data_components/getWeatherData";

async function DataInjecter(searchQuery) {
  const weatherData = await getWeatherData(searchQuery);
  console.log(weatherData);

  renderWeatherData();
  renderBeachRating();

  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.style.maxHeight = "500px";

  function renderWeatherData() {
    const headerElement = document.querySelector("#weather-header");
    const temperatureElement = document.querySelector("#weather-temp");
    const descriptionElement = document.querySelector("#weather-description");
    const humidityElement = document.querySelector("#weather-humidity");
    const windElement = document.querySelector("#weather-wind");

    headerElement.textContent = weatherData.locationName;
    temperatureElement.textContent = `${weatherData.temp}°C`;
    descriptionElement.textContent = weatherData.conditionDescription;
    humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
    windElement.textContent = `Wind speed: ${weatherData.windSpeed} km/h`;
  }

  function renderBeachRating() {
    const beachRatingElement = document.querySelector("#beach-rating-message");
    beachRatingElement.textContent = `Today is a ${getBeachRating()} day to go to the beach.`;
  }

  function getBeachRating() {
    if (
      weatherData.isRain ||
      weatherData.temp < 16 ||
      weatherData.windSpeed > 30
    ) {
      return "bad";
    } else if (
      (weatherData.temp >= 16 &&
        weatherData.temp < 24 &&
        weatherData.windSpeed <= 16) ||
      weatherData.cloudCover > 50
    ) {
      return "ok";
    } else {
      return "good";
    }
  }
}

export { DataInjecter };
