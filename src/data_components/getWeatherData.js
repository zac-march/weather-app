export async function getWeatherData(searchQuery) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=28fe7b5f9a78838c639143fc517e4343&units=metric`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudCover = weatherData.clouds.all;
    let isRain = false;
    if (weatherData.weather[0].id <= 781) {
      isRain = true;
    }
    return { humidity, temp, windSpeed, isRain, cloudCover };
  } catch (err) {
    console.log(err);
  }
}
