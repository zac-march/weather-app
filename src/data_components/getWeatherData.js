export async function getWeatherData(searchQuery) {
  let wasCallSuccess, callMessage;
  let callStatus = { wasCallSuccess, callMessage };
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=28fe7b5f9a78838c639143fc517e4343&units=metric`;
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      console.log("hit");
      callStatus.wasCallSuccess = false;
      callStatus.callMessage = getCallStatus(response.status);
      return callStatus;
    }

    const weatherData = await response.json();
    const locationName = `${weatherData.name}, ${weatherData.sys.country}`;
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const cloudCover = weatherData.clouds.all;
    const conditionDescription = weatherData.weather[0].description;
    let isRain = false;

    if (weatherData.weather[0].id <= 781) {
      isRain = true;
    }
    return {
      callStatus,
      locationName,
      humidity,
      temp,
      windSpeed,
      isRain,
      cloudCover,
      conditionDescription,
    };
  } catch (err) {
    console.log(err);
  }

  function getCallStatus(status) {
    if (status == "404") {
      return "Location not found!";
    }
  }
}
