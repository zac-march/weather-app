import { DataInjecter } from "./DataInjecter";

export function MainUIController() {
  const main = document.querySelector("main");

  renderSearch();
  renderSearchResults();

  function renderSearch() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search");
    main.append(searchContainer);

    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    searchButton.textContent = "Beach day?";
    searchButton.addEventListener("click", () => {
      const searchQuery = searchInput.value;
      if (searchQuery == "") {
        return;
      }
      DataInjecter(searchQuery);
      searchInput.value = "";
    });
    searchContainer.append(searchInput, searchButton);
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
          <h1 id="weather-header"></h1>
          <h2 id="weather-temp"></h2>
          <div class="weather-details">
            <h3 id="weather-description"></h3>
            <h3 id="weather-humidity"></h3>
            <h3 id="weather-wind"></h3>
          </div>
    `;
    }
    function renderBeachScore() {
      const beachScoreContainer = document.createElement("div");
      beachScoreContainer.classList.add("beach-score-container");
      searchResultsContainer.appendChild(beachScoreContainer);
      beachScoreContainer.innerHTML = `
    <h3 id="beach-rating-message"></h3>
    <img src="https://picsum.photos/200/200/" alt="a gif" />
    `;
    }
  }
}
