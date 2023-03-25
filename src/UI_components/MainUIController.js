import { DataInjecter } from "./DataInjecter";

export function MainUIController() {
  const main = document.querySelector("main");

  renderSearch();
  renderSearchResults();

  function renderSearch() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search");
    main.append(searchContainer);

    const searchInput = createSearchInput();
    const searchButton = createSearchButton();
    const errorContainer = createErrorContainer();

    searchContainer.append(searchInput, searchButton, errorContainer);

    function createErrorContainer() {
      const errorContainer = document.createElement("div");
      const errorMessage = document.createElement("small");
      errorContainer.classList.add("search-error-container");
      errorMessage.id = "search-error-message";
      errorContainer.append(errorMessage);
      return errorContainer;
    }

    function createSearchButton() {
      const searchButton = document.createElement("button");
      searchButton.textContent = "Beach day?";

      searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        if (searchTerm == "") {
          searchInput.style.outline = "1px solid red";
          return;
        }
        DataInjecter(searchTerm);
        searchInput.value = "";
      });
      return searchButton;
    }

    function createSearchInput() {
      const searchInput = document.createElement("input");
      searchInput.placeholder = "Melbourne, AU";

      searchInput.addEventListener("click", () => {
        const errorMessage = document.querySelector("#search-error-message");
        errorMessage.textContent = "";
        searchInput.style.removeProperty("outline");
      });
      return searchInput;
    }
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
    <img alt="a gif" />
    `;
    }
  }
}
