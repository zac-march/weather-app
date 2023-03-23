export function MainUIController() {
  const main = document.querySelector("main");

  renderSearch();
  renderSearchResults();

  function renderSearch() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search");

    searchContainer.innerHTML = `
  <input />
  <button>Beach day?</button>
  `;
    main.append(searchContainer);
  }

  function renderSearchResults() {
    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.classList.add("results-container");
    main.append(searchResultsContainer);

    renderWeather();
    renderBeachScore();

    function renderWeather() {
      const weatherContainer = document.createElement("div");
      weatherContainer.classList.add("weather-container");
      searchResultsContainer.appendChild(weatherContainer);
      weatherContainer.innerHTML = `
    <div>
          <h1>Melbourne</h1>
          <h2>9.25 C</h2>
          <div class="weather-details">
            <h3>Scattered showers</h3>
            <h3>Humidity: 83%</h3>
            <h3>Wind: 12kmh</h3>
          </div>
    `;
    }
    function renderBeachScore() {
      const beachScoreContainer = document.createElement("div");
      beachScoreContainer.classList.add("beach-score-container");
      searchResultsContainer.appendChild(beachScoreContainer);
      beachScoreContainer.innerHTML = `
    <h3>its a great day to go to the beach</h3>
    <img src="https://picsum.photos/200/200/" alt="a gif" />
    `;
    }
  }
}
