import { getGif } from "../data_components/getGif";
import { getWeatherData } from "../data_components/getWeatherData";

async function DataInjecter(searchQuery) {
  const weatherData = await getWeatherData(searchQuery);
  if (!weatherData.callStatus) {
    renderCallFailed(weatherData.callMessage);
    return;
  }

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

  async function renderBeachRating() {
    const beachRatingElement = document.querySelector("#beach-rating-message");
    const beachRating = getBeachRating();
    beachRatingElement.textContent = `Today is a ${beachRating} day to swim at the beach.`;
    const beachRatingImage = document.querySelector(
      ".beach-score-container img"
    );
    let gifSearchTerm;
    if (beachRating == "bad") {
      gifSearchTerm = "sad dog";
    } else {
      gifSearchTerm = "dog beach";
    }

    const gifData = await getGif(gifSearchTerm);
    beachRatingImage.src = gifData.url;
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

  function renderCallFailed(message) {
    const errorMessage = document.querySelector("#search-error-message");
    errorMessage.textContent = message;
  }
}

export { DataInjecter };
