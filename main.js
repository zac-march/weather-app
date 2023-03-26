/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI_components/DataInjecter.js":
/*!*******************************************!*\
  !*** ./src/UI_components/DataInjecter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataInjecter": () => (/* binding */ DataInjecter)
/* harmony export */ });
/* harmony import */ var _data_components_getGif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data_components/getGif */ "./src/data_components/getGif.js");
/* harmony import */ var _data_components_getWeatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data_components/getWeatherData */ "./src/data_components/getWeatherData.js");


async function DataInjecter(searchQuery) {
  const weatherData = await (0,_data_components_getWeatherData__WEBPACK_IMPORTED_MODULE_1__.getWeatherData)(searchQuery);
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
    const beachRatingImage = document.querySelector(".beach-score-container img");
    let gifSearchTerm;
    if (beachRating == "bad") {
      gifSearchTerm = "sad dog";
    } else {
      gifSearchTerm = "dog beach";
    }
    const gifData = await (0,_data_components_getGif__WEBPACK_IMPORTED_MODULE_0__.getGif)(gifSearchTerm);
    beachRatingImage.src = gifData.url;
  }
  function getBeachRating() {
    if (weatherData.isRain || weatherData.temp < 16 || weatherData.windSpeed > 30) {
      return "bad";
    } else if (weatherData.temp >= 16 && weatherData.temp < 24 && weatherData.windSpeed <= 16 || weatherData.cloudCover > 50) {
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


/***/ }),

/***/ "./src/UI_components/MainUIController.js":
/*!***********************************************!*\
  !*** ./src/UI_components/MainUIController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainUIController": () => (/* binding */ MainUIController)
/* harmony export */ });
/* harmony import */ var _DataInjecter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataInjecter */ "./src/UI_components/DataInjecter.js");

function MainUIController() {
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
        (0,_DataInjecter__WEBPACK_IMPORTED_MODULE_0__.DataInjecter)(searchTerm);
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

/***/ }),

/***/ "./src/data_components/getGif.js":
/*!***************************************!*\
  !*** ./src/data_components/getGif.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGif": () => (/* binding */ getGif)
/* harmony export */ });
async function getGif(searchTerm) {
  const apiKey = "AIzaSyAbjBP2DJwiM-Xz4cAp1-Nznijstg2n_GY";
  const limit = 20;
  const searchUrl = "https://tenor.googleapis.com/v2/search?q=" + searchTerm + "&key=" + apiKey + "&limit=" + limit;
  const response = await fetch(searchUrl);
  const gifsData = await response.json();
  const randomIndex = Math.floor(Math.random() * (limit - 1));
  const gifData = gifsData.results[randomIndex].media_formats.tinygif;
  return gifData;
}


/***/ }),

/***/ "./src/data_components/getWeatherData.js":
/*!***********************************************!*\
  !*** ./src/data_components/getWeatherData.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeatherData": () => (/* binding */ getWeatherData)
/* harmony export */ });
async function getWeatherData(searchQuery) {
  let wasCallSuccess, callMessage;
  let callStatus = {
    wasCallSuccess,
    callMessage
  };
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
      conditionDescription
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

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Dosis:wght@300;400&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* latin */\n\n:root {\n  --font-color: rgb(0, 0, 0);\n  --background-colour: #eee;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  font-family: \"Dosis\", sans-serif;\n  background-color: var(--background-colour);\n  color: var(--font-color);\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  padding: 1rem;\n}\n\nheader {\n  font-size: 3rem;\n  text-align: center;\n}\n\n/* Main */\n\nmain {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n  gap: 2rem;\n}\n\nmain h2,\nmain h3 {\n  font-weight: 200;\n}\n\n.results-container {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.5s ease-out;\n}\n\n.weather-container {\n  background-color: #69a498;\n  color: white;\n  padding: 1rem;\n  box-shadow: rgb(128 128 128 / 71%) 3px 0px 15px -10px;\n  border-top-left-radius: 20px;\n  border-bottom-left-radius: 20px;\n  z-index: 1;\n}\n\n.weather-container > div {\n  display: grid;\n  gap: 1rem;\n}\n\n.beach-score-container {\n  background-color: #69a49893;\n  padding: 2.5rem 3rem;\n  border-top-right-radius: 20px;\n  border-bottom-right-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n}\n\n.beach-score-container > * {\n  color: #ffffff;\n  font-weight: bold;\n}\n\n.beach-score-container img {\n  display: block;\n  width: 200px;\n  height: 150px;\n  object-fit: cover;\n}\n\n.search {\n  display: grid;\n  grid-template-columns: 1fr max-content;\n}\n\n.search > * {\n  font-size: large;\n  border: none;\n}\n\n.search input {\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n  padding: 10px;\n  z-index: 2;\n}\n\n.search button {\n  color: white;\n  font-family: \"dosis\";\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #69a498;\n  padding: 10px;\n  border: 1px solid #7cb9e8;\n  text-decoration: none;\n  text-align: center;\n}\n\n.search button:active {\n  background-color: #548379;\n  border: 1px solid #2c4e5f;\n}\n\n.search-error-container {\n  color: red;\n  text-align: left;\n  padding-left: 5px;\n}\n\n/* Footer */\n\nfooter {\n  display: flex;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.github-link {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.705);\n}\n\n.fa-github {\n  font-size: 1.5rem;\n  transition: transform 0.2s ease-in-out;\n  color: rgba(0, 0, 0, 0.705);\n}\n\nfooter > a:hover > i {\n  transform: rotate(-2deg) scale(1.1);\n}\n\n@media only screen and (max-width: 600px) {\n  header {\n    font-size: 2rem;\n  }\n  .search {\n    width: 100%;\n  }\n  .results-container {\n    grid-auto-flow: row;\n  }\n\n  .weather-container {\n    box-shadow: rgb(128 128 128 / 71%) 0 4px 15px -6px;\n    border-radius: 0;\n    border-top-left-radius: 20px;\n    border-top-right-radius: 20px;\n  }\n  .beach-score-container {\n    border-radius: 0;\n    border-bottom-left-radius: 20px;\n    border-bottom-right-radius: 20px;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA,UAAU;;AAGV;EACE,0BAA0B;EAC1B,yBAAyB;AAC3B;;AAEA;;;EAGE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;;EAEE,WAAW;EACX,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,gCAAgC;EAChC,0CAA0C;EAC1C,wBAAwB;EACxB,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,aAAa;AACf;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA,SAAS;;AAET;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;EAClB,SAAS;AACX;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,gBAAgB;EAChB,oCAAoC;AACtC;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,qDAAqD;EACrD,4BAA4B;EAC5B,+BAA+B;EAC/B,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,2BAA2B;EAC3B,oBAAoB;EACpB,6BAA6B;EAC7B,gCAAgC;EAChC,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,2BAA2B;EAC3B,8BAA8B;EAC9B,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,oBAAoB;EACpB,4BAA4B;EAC5B,+BAA+B;EAC/B,yBAAyB;EACzB,aAAa;EACb,yBAAyB;EACzB,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA,WAAW;;AAEX;EACE,aAAa;EACb,uBAAuB;EACvB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;EACX,qBAAqB;EACrB,2BAA2B;AAC7B;;AAEA;EACE,iBAAiB;EACjB,sCAAsC;EACtC,2BAA2B;AAC7B;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE;IACE,eAAe;EACjB;EACA;IACE,WAAW;EACb;EACA;IACE,mBAAmB;EACrB;;EAEA;IACE,kDAAkD;IAClD,gBAAgB;IAChB,4BAA4B;IAC5B,6BAA6B;EAC/B;EACA;IACE,gBAAgB;IAChB,+BAA+B;IAC/B,gCAAgC;EAClC;AACF","sourcesContent":["/* latin */\n@import url(\"https://fonts.googleapis.com/css2?family=Dosis:wght@300;400&display=swap\");\n\n:root {\n  --font-color: rgb(0, 0, 0);\n  --background-colour: #eee;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  font-family: \"Dosis\", sans-serif;\n  background-color: var(--background-colour);\n  color: var(--font-color);\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  padding: 1rem;\n}\n\nheader {\n  font-size: 3rem;\n  text-align: center;\n}\n\n/* Main */\n\nmain {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n  gap: 2rem;\n}\n\nmain h2,\nmain h3 {\n  font-weight: 200;\n}\n\n.results-container {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.5s ease-out;\n}\n\n.weather-container {\n  background-color: #69a498;\n  color: white;\n  padding: 1rem;\n  box-shadow: rgb(128 128 128 / 71%) 3px 0px 15px -10px;\n  border-top-left-radius: 20px;\n  border-bottom-left-radius: 20px;\n  z-index: 1;\n}\n\n.weather-container > div {\n  display: grid;\n  gap: 1rem;\n}\n\n.beach-score-container {\n  background-color: #69a49893;\n  padding: 2.5rem 3rem;\n  border-top-right-radius: 20px;\n  border-bottom-right-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n}\n\n.beach-score-container > * {\n  color: #ffffff;\n  font-weight: bold;\n}\n\n.beach-score-container img {\n  display: block;\n  width: 200px;\n  height: 150px;\n  object-fit: cover;\n}\n\n.search {\n  display: grid;\n  grid-template-columns: 1fr max-content;\n}\n\n.search > * {\n  font-size: large;\n  border: none;\n}\n\n.search input {\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n  padding: 10px;\n  z-index: 2;\n}\n\n.search button {\n  color: white;\n  font-family: \"dosis\";\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #69a498;\n  padding: 10px;\n  border: 1px solid #7cb9e8;\n  text-decoration: none;\n  text-align: center;\n}\n\n.search button:active {\n  background-color: #548379;\n  border: 1px solid #2c4e5f;\n}\n\n.search-error-container {\n  color: red;\n  text-align: left;\n  padding-left: 5px;\n}\n\n/* Footer */\n\nfooter {\n  display: flex;\n  justify-content: center;\n  gap: 0.5rem;\n}\n\n.github-link {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.705);\n}\n\n.fa-github {\n  font-size: 1.5rem;\n  transition: transform 0.2s ease-in-out;\n  color: rgba(0, 0, 0, 0.705);\n}\n\nfooter > a:hover > i {\n  transform: rotate(-2deg) scale(1.1);\n}\n\n@media only screen and (max-width: 600px) {\n  header {\n    font-size: 2rem;\n  }\n  .search {\n    width: 100%;\n  }\n  .results-container {\n    grid-auto-flow: row;\n  }\n\n  .weather-container {\n    box-shadow: rgb(128 128 128 / 71%) 0 4px 15px -6px;\n    border-radius: 0;\n    border-top-left-radius: 20px;\n    border-top-right-radius: 20px;\n  }\n  .beach-score-container {\n    border-radius: 0;\n    border-bottom-left-radius: 20px;\n    border-bottom-right-radius: 20px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_components_MainUIController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI_components/MainUIController */ "./src/UI_components/MainUIController.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


(0,_UI_components_MainUIController__WEBPACK_IMPORTED_MODULE_0__.MainUIController)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBb0U7QUFDL0M7QUFFckJqRCxpRkFBZ0IsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJX2NvbXBvbmVudHMvRGF0YUluamVjdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9VSV9jb21wb25lbnRzL01haW5VSUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFfY29tcG9uZW50cy9nZXRHaWYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFfY29tcG9uZW50cy9nZXRXZWF0aGVyRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdpZiB9IGZyb20gXCIuLi9kYXRhX2NvbXBvbmVudHMvZ2V0R2lmXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuLi9kYXRhX2NvbXBvbmVudHMvZ2V0V2VhdGhlckRhdGFcIjtcblxuYXN5bmMgZnVuY3Rpb24gRGF0YUluamVjdGVyKHNlYXJjaFF1ZXJ5KSB7XG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEoc2VhcmNoUXVlcnkpO1xuICBpZiAoIXdlYXRoZXJEYXRhLmNhbGxTdGF0dXMpIHtcbiAgICByZW5kZXJDYWxsRmFpbGVkKHdlYXRoZXJEYXRhLmNhbGxNZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZW5kZXJXZWF0aGVyRGF0YSgpO1xuICByZW5kZXJCZWFjaFJhdGluZygpO1xuXG4gIGNvbnN0IHJlc3VsdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpO1xuICByZXN1bHRzQ29udGFpbmVyLnN0eWxlLm1heEhlaWdodCA9IFwiNTAwcHhcIjtcblxuICBmdW5jdGlvbiByZW5kZXJXZWF0aGVyRGF0YSgpIHtcbiAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyLWhlYWRlclwiKTtcbiAgICBjb25zdCB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXItdGVtcFwiKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXItZGVzY3JpcHRpb25cIik7XG4gICAgY29uc3QgaHVtaWRpdHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyLWh1bWlkaXR5XCIpO1xuICAgIGNvbnN0IHdpbmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyLXdpbmRcIik7XG5cbiAgICBoZWFkZXJFbGVtZW50LnRleHRDb250ZW50ID0gd2VhdGhlckRhdGEubG9jYXRpb25OYW1lO1xuICAgIHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLnRlbXB9wrBDYDtcbiAgICBkZXNjcmlwdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSB3ZWF0aGVyRGF0YS5jb25kaXRpb25EZXNjcmlwdGlvbjtcbiAgICBodW1pZGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7d2VhdGhlckRhdGEuaHVtaWRpdHl9JWA7XG4gICAgd2luZEVsZW1lbnQudGV4dENvbnRlbnQgPSBgV2luZCBzcGVlZDogJHt3ZWF0aGVyRGF0YS53aW5kU3BlZWR9IGttL2hgO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyQmVhY2hSYXRpbmcoKSB7XG4gICAgY29uc3QgYmVhY2hSYXRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiZWFjaC1yYXRpbmctbWVzc2FnZVwiKTtcbiAgICBjb25zdCBiZWFjaFJhdGluZyA9IGdldEJlYWNoUmF0aW5nKCk7XG4gICAgYmVhY2hSYXRpbmdFbGVtZW50LnRleHRDb250ZW50ID0gYFRvZGF5IGlzIGEgJHtiZWFjaFJhdGluZ30gZGF5IHRvIHN3aW0gYXQgdGhlIGJlYWNoLmA7XG4gICAgY29uc3QgYmVhY2hSYXRpbmdJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5iZWFjaC1zY29yZS1jb250YWluZXIgaW1nXCJcbiAgICApO1xuICAgIGxldCBnaWZTZWFyY2hUZXJtO1xuICAgIGlmIChiZWFjaFJhdGluZyA9PSBcImJhZFwiKSB7XG4gICAgICBnaWZTZWFyY2hUZXJtID0gXCJzYWQgZG9nXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdpZlNlYXJjaFRlcm0gPSBcImRvZyBiZWFjaFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGdpZkRhdGEgPSBhd2FpdCBnZXRHaWYoZ2lmU2VhcmNoVGVybSk7XG4gICAgYmVhY2hSYXRpbmdJbWFnZS5zcmMgPSBnaWZEYXRhLnVybDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJlYWNoUmF0aW5nKCkge1xuICAgIGlmIChcbiAgICAgIHdlYXRoZXJEYXRhLmlzUmFpbiB8fFxuICAgICAgd2VhdGhlckRhdGEudGVtcCA8IDE2IHx8XG4gICAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPiAzMFxuICAgICkge1xuICAgICAgcmV0dXJuIFwiYmFkXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICh3ZWF0aGVyRGF0YS50ZW1wID49IDE2ICYmXG4gICAgICAgIHdlYXRoZXJEYXRhLnRlbXAgPCAyNCAmJlxuICAgICAgICB3ZWF0aGVyRGF0YS53aW5kU3BlZWQgPD0gMTYpIHx8XG4gICAgICB3ZWF0aGVyRGF0YS5jbG91ZENvdmVyID4gNTBcbiAgICApIHtcbiAgICAgIHJldHVybiBcIm9rXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcImdvb2RcIjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJDYWxsRmFpbGVkKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1lcnJvci1tZXNzYWdlXCIpO1xuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH1cbn1cblxuZXhwb3J0IHsgRGF0YUluamVjdGVyIH07XG4iLCJpbXBvcnQgeyBEYXRhSW5qZWN0ZXIgfSBmcm9tIFwiLi9EYXRhSW5qZWN0ZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIE1haW5VSUNvbnRyb2xsZXIoKSB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICByZW5kZXJTZWFyY2goKTtcbiAgcmVuZGVyU2VhcmNoUmVzdWx0cygpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlclNlYXJjaCgpIHtcbiAgICBjb25zdCBzZWFyY2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNlYXJjaENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2VhcmNoXCIpO1xuICAgIG1haW4uYXBwZW5kKHNlYXJjaENvbnRhaW5lcik7XG5cbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGNyZWF0ZVNlYXJjaElucHV0KCk7XG4gICAgY29uc3Qgc2VhcmNoQnV0dG9uID0gY3JlYXRlU2VhcmNoQnV0dG9uKCk7XG4gICAgY29uc3QgZXJyb3JDb250YWluZXIgPSBjcmVhdGVFcnJvckNvbnRhaW5lcigpO1xuXG4gICAgc2VhcmNoQ29udGFpbmVyLmFwcGVuZChzZWFyY2hJbnB1dCwgc2VhcmNoQnV0dG9uLCBlcnJvckNvbnRhaW5lcik7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFcnJvckNvbnRhaW5lcigpIHtcbiAgICAgIGNvbnN0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzbWFsbFwiKTtcbiAgICAgIGVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzZWFyY2gtZXJyb3ItY29udGFpbmVyXCIpO1xuICAgICAgZXJyb3JNZXNzYWdlLmlkID0gXCJzZWFyY2gtZXJyb3ItbWVzc2FnZVwiO1xuICAgICAgZXJyb3JDb250YWluZXIuYXBwZW5kKGVycm9yTWVzc2FnZSk7XG4gICAgICByZXR1cm4gZXJyb3JDb250YWluZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VhcmNoQnV0dG9uKCkge1xuICAgICAgY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHNlYXJjaEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQmVhY2ggZGF5P1wiO1xuXG4gICAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PSBcIlwiKSB7XG4gICAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUub3V0bGluZSA9IFwiMXB4IHNvbGlkIHJlZFwiO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBEYXRhSW5qZWN0ZXIoc2VhcmNoVGVybSk7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNlYXJjaEJ1dHRvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZWFyY2hJbnB1dCgpIHtcbiAgICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSBcIk1lbGJvdXJuZSwgQVVcIjtcblxuICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2gtZXJyb3ItbWVzc2FnZVwiKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdXRsaW5lXCIpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc2VhcmNoSW5wdXQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyU2VhcmNoUmVzdWx0cygpIHtcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzZWFyY2hSZXN1bHRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBtYWluLmFwcGVuZChzZWFyY2hSZXN1bHRzQ29udGFpbmVyKTtcblxuICAgIHJlbmRlcldlYXRoZXIoKTtcbiAgICByZW5kZXJCZWFjaFNjb3JlKCk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJXZWF0aGVyKCkge1xuICAgICAgY29uc3Qgd2VhdGhlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB3ZWF0aGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNvbnRhaW5lclwiKTtcbiAgICAgIHNlYXJjaFJlc3VsdHNDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlckNvbnRhaW5lcik7XG4gICAgICB3ZWF0aGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2PlxuICAgICAgICAgIDxoMSBpZD1cIndlYXRoZXItaGVhZGVyXCI+PC9oMT5cbiAgICAgICAgICA8aDIgaWQ9XCJ3ZWF0aGVyLXRlbXBcIj48L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWF0aGVyLWRldGFpbHNcIj5cbiAgICAgICAgICAgIDxoMyBpZD1cIndlYXRoZXItZGVzY3JpcHRpb25cIj48L2gzPlxuICAgICAgICAgICAgPGgzIGlkPVwid2VhdGhlci1odW1pZGl0eVwiPjwvaDM+XG4gICAgICAgICAgICA8aDMgaWQ9XCJ3ZWF0aGVyLXdpbmRcIj48L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckJlYWNoU2NvcmUoKSB7XG4gICAgICBjb25zdCBiZWFjaFNjb3JlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGJlYWNoU2NvcmVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJlYWNoLXNjb3JlLWNvbnRhaW5lclwiKTtcbiAgICAgIHNlYXJjaFJlc3VsdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoYmVhY2hTY29yZUNvbnRhaW5lcik7XG4gICAgICBiZWFjaFNjb3JlQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8aDMgaWQ9XCJiZWFjaC1yYXRpbmctbWVzc2FnZVwiPjwvaDM+XG4gICAgPGltZyBhbHQ9XCJhIGdpZlwiIC8+XG4gICAgYDtcbiAgICB9XG4gIH1cbn1cbiIsImFzeW5jIGZ1bmN0aW9uIGdldEdpZihzZWFyY2hUZXJtKSB7XG4gIGNvbnN0IGFwaUtleSA9IFwiQUl6YVN5QWJqQlAyREp3aU0tWHo0Y0FwMS1Oem5panN0ZzJuX0dZXCI7XG4gIGNvbnN0IGxpbWl0ID0gMjA7XG4gIGNvbnN0IHNlYXJjaFVybCA9XG4gICAgXCJodHRwczovL3Rlbm9yLmdvb2dsZWFwaXMuY29tL3YyL3NlYXJjaD9xPVwiICtcbiAgICBzZWFyY2hUZXJtICtcbiAgICBcIiZrZXk9XCIgK1xuICAgIGFwaUtleSArXG4gICAgXCImbGltaXQ9XCIgK1xuICAgIGxpbWl0O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc2VhcmNoVXJsKTtcbiAgY29uc3QgZ2lmc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobGltaXQgLSAxKSk7XG4gIGNvbnN0IGdpZkRhdGEgPSBnaWZzRGF0YS5yZXN1bHRzW3JhbmRvbUluZGV4XS5tZWRpYV9mb3JtYXRzLnRpbnlnaWY7XG4gIHJldHVybiBnaWZEYXRhO1xufVxuXG5leHBvcnQgeyBnZXRHaWYgfTtcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShzZWFyY2hRdWVyeSkge1xuICBsZXQgd2FzQ2FsbFN1Y2Nlc3MsIGNhbGxNZXNzYWdlO1xuICBsZXQgY2FsbFN0YXR1cyA9IHsgd2FzQ2FsbFN1Y2Nlc3MsIGNhbGxNZXNzYWdlIH07XG4gIGNvbnN0IGFwaVVSTCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7c2VhcmNoUXVlcnl9JmFwcGlkPTI4ZmU3YjVmOWE3ODgzOGM2MzkxNDNmYzUxN2U0MzQzJnVuaXRzPW1ldHJpY2A7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlVUkwpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpO1xuICAgICAgY2FsbFN0YXR1cy53YXNDYWxsU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgY2FsbFN0YXR1cy5jYWxsTWVzc2FnZSA9IGdldENhbGxTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgIHJldHVybiBjYWxsU3RhdHVzO1xuICAgIH1cblxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IGxvY2F0aW9uTmFtZSA9IGAke3dlYXRoZXJEYXRhLm5hbWV9LCAke3dlYXRoZXJEYXRhLnN5cy5jb3VudHJ5fWA7XG4gICAgY29uc3QgdGVtcCA9IHdlYXRoZXJEYXRhLm1haW4udGVtcDtcbiAgICBjb25zdCBodW1pZGl0eSA9IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgY29uc3Qgd2luZFNwZWVkID0gd2VhdGhlckRhdGEud2luZC5zcGVlZDtcbiAgICBjb25zdCBjbG91ZENvdmVyID0gd2VhdGhlckRhdGEuY2xvdWRzLmFsbDtcbiAgICBjb25zdCBjb25kaXRpb25EZXNjcmlwdGlvbiA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IGlzUmFpbiA9IGZhbHNlO1xuXG4gICAgaWYgKHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uaWQgPD0gNzgxKSB7XG4gICAgICBpc1JhaW4gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2FsbFN0YXR1cyxcbiAgICAgIGxvY2F0aW9uTmFtZSxcbiAgICAgIGh1bWlkaXR5LFxuICAgICAgdGVtcCxcbiAgICAgIHdpbmRTcGVlZCxcbiAgICAgIGlzUmFpbixcbiAgICAgIGNsb3VkQ292ZXIsXG4gICAgICBjb25kaXRpb25EZXNjcmlwdGlvbixcbiAgICB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2FsbFN0YXR1cyhzdGF0dXMpIHtcbiAgICBpZiAoc3RhdHVzID09IFwiNDA0XCIpIHtcbiAgICAgIHJldHVybiBcIkxvY2F0aW9uIG5vdCBmb3VuZCFcIjtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RG9zaXM6d2dodEAzMDA7NDAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGxhdGluICovXFxuXFxuOnJvb3Qge1xcbiAgLS1mb250LWNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICAtLWJhY2tncm91bmQtY29sb3VyOiAjZWVlO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRG9zaXNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvdXIpO1xcbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDJyZW07XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4vKiBNYWluICovXFxuXFxubWFpbiB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBnYXA6IDJyZW07XFxufVxcblxcbm1haW4gaDIsXFxubWFpbiBoMyB7XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG5cXG4ucmVzdWx0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxuICBtYXgtaGVpZ2h0OiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC41cyBlYXNlLW91dDtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2OWE0OTg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm94LXNoYWRvdzogcmdiKDEyOCAxMjggMTI4IC8gNzElKSAzcHggMHB4IDE1cHggLTEwcHg7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcXG4gIHotaW5kZXg6IDE7XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lciA+IGRpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4uYmVhY2gtc2NvcmUtY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2OWE0OTg5MztcXG4gIHBhZGRpbmc6IDIuNXJlbSAzcmVtO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxcmVtO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJlYWNoLXNjb3JlLWNvbnRhaW5lciA+ICoge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmJlYWNoLXNjb3JlLWNvbnRhaW5lciBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMjAwcHg7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcblxcbi5zZWFyY2gge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIG1heC1jb250ZW50O1xcbn1cXG5cXG4uc2VhcmNoID4gKiB7XFxuICBmb250LXNpemU6IGxhcmdlO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uc2VhcmNoIGlucHV0IHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4uc2VhcmNoIGJ1dHRvbiB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogXFxcImRvc2lzXFxcIjtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5YTQ5ODtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjN2NiOWU4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uc2VhcmNoIGJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU0ODM3OTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMyYzRlNWY7XFxufVxcblxcbi5zZWFyY2gtZXJyb3ItY29udGFpbmVyIHtcXG4gIGNvbG9yOiByZWQ7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxufVxcblxcbi8qIEZvb3RlciAqL1xcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDAuNXJlbTtcXG59XFxuXFxuLmdpdGh1Yi1saW5rIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAwLjVyZW07XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcwNSk7XFxufVxcblxcbi5mYS1naXRodWIge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLWluLW91dDtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzA1KTtcXG59XFxuXFxuZm9vdGVyID4gYTpob3ZlciA+IGkge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTJkZWcpIHNjYWxlKDEuMSk7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gIH1cXG4gIC5zZWFyY2gge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG4gIC5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgIGdyaWQtYXV0by1mbG93OiByb3c7XFxuICB9XFxuXFxuICAud2VhdGhlci1jb250YWluZXIge1xcbiAgICBib3gtc2hhZG93OiByZ2IoMTI4IDEyOCAxMjggLyA3MSUpIDAgNHB4IDE1cHggLTZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XFxuICB9XFxuICAuYmVhY2gtc2NvcmUtY29udGFpbmVyIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDIwcHg7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsVUFBVTs7QUFHVjtFQUNFLDBCQUEwQjtFQUMxQix5QkFBeUI7QUFDM0I7O0FBRUE7OztFQUdFLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBOztFQUVFLFdBQVc7RUFDWCxZQUFZO0VBQ1osU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLDBDQUEwQztFQUMxQyx3QkFBd0I7RUFDeEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQSxTQUFTOztBQUVUO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixTQUFTO0FBQ1g7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osYUFBYTtFQUNiLHFEQUFxRDtFQUNyRCw0QkFBNEI7RUFDNUIsK0JBQStCO0VBQy9CLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0Isb0JBQW9CO0VBQ3BCLDZCQUE2QjtFQUM3QixnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDhCQUE4QjtFQUM5QixhQUFhO0VBQ2IsVUFBVTtBQUNaOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQiw0QkFBNEI7RUFDNUIsK0JBQStCO0VBQy9CLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLHFCQUFxQjtFQUNyQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkI7O0FBRUEsV0FBVzs7QUFFWDtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixzQ0FBc0M7RUFDdEMsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0U7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxXQUFXO0VBQ2I7RUFDQTtJQUNFLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLGtEQUFrRDtJQUNsRCxnQkFBZ0I7SUFDaEIsNEJBQTRCO0lBQzVCLDZCQUE2QjtFQUMvQjtFQUNBO0lBQ0UsZ0JBQWdCO0lBQ2hCLCtCQUErQjtJQUMvQixnQ0FBZ0M7RUFDbEM7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBsYXRpbiAqL1xcbkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PURvc2lzOndnaHRAMzAwOzQwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG5cXG46cm9vdCB7XFxuICAtLWZvbnQtY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIC0tYmFja2dyb3VuZC1jb2xvdXI6ICNlZWU7XFxufVxcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJEb3Npc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG91cik7XFxuICBjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMnJlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcblxcbmhlYWRlciB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi8qIE1haW4gKi9cXG5cXG5tYWluIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGdhcDogMnJlbTtcXG59XFxuXFxubWFpbiBoMixcXG5tYWluIGgzIHtcXG4gIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcblxcbi5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXG4gIG1heC1oZWlnaHQ6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjVzIGVhc2Utb3V0O1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5YTQ5ODtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3gtc2hhZG93OiByZ2IoMTI4IDEyOCAxMjggLyA3MSUpIDNweCAwcHggMTVweCAtMTBweDtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyID4gZGl2IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDFyZW07XFxufVxcblxcbi5iZWFjaC1zY29yZS1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY5YTQ5ODkzO1xcbiAgcGFkZGluZzogMi41cmVtIDNyZW07XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDFyZW07XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYmVhY2gtc2NvcmUtY29udGFpbmVyID4gKiB7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4uYmVhY2gtc2NvcmUtY29udGFpbmVyIGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGhlaWdodDogMTUwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuXFxuLnNlYXJjaCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgbWF4LWNvbnRlbnQ7XFxufVxcblxcbi5zZWFyY2ggPiAqIHtcXG4gIGZvbnQtc2l6ZTogbGFyZ2U7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5zZWFyY2ggaW5wdXQge1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHotaW5kZXg6IDI7XFxufVxcblxcbi5zZWFyY2ggYnV0dG9uIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiZG9zaXNcXFwiO1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjlhNDk4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM3Y2I5ZTg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5zZWFyY2ggYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTQ4Mzc5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzJjNGU1ZjtcXG59XFxuXFxuLnNlYXJjaC1lcnJvci1jb250YWluZXIge1xcbiAgY29sb3I6IHJlZDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG59XFxuXFxuLyogRm9vdGVyICovXFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMC41cmVtO1xcbn1cXG5cXG4uZ2l0aHViLWxpbmsge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDAuNXJlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzA1KTtcXG59XFxuXFxuLmZhLWdpdGh1YiB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43MDUpO1xcbn1cXG5cXG5mb290ZXIgPiBhOmhvdmVyID4gaSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMmRlZykgc2NhbGUoMS4xKTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgfVxcbiAgLnNlYXJjaCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbiAgLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgZ3JpZC1hdXRvLWZsb3c6IHJvdztcXG4gIH1cXG5cXG4gIC53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgIGJveC1zaGFkb3c6IHJnYigxMjggMTI4IDEyOCAvIDcxJSkgMCA0cHggMTVweCAtNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcXG4gIH1cXG4gIC5iZWFjaC1zY29yZS1jb250YWluZXIge1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjBweDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IE1haW5VSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9VSV9jb21wb25lbnRzL01haW5VSUNvbnRyb2xsZXJcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbk1haW5VSUNvbnRyb2xsZXIoKTtcbiJdLCJuYW1lcyI6WyJnZXRHaWYiLCJnZXRXZWF0aGVyRGF0YSIsIkRhdGFJbmplY3RlciIsInNlYXJjaFF1ZXJ5Iiwid2VhdGhlckRhdGEiLCJjYWxsU3RhdHVzIiwicmVuZGVyQ2FsbEZhaWxlZCIsImNhbGxNZXNzYWdlIiwicmVuZGVyV2VhdGhlckRhdGEiLCJyZW5kZXJCZWFjaFJhdGluZyIsInJlc3VsdHNDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsIm1heEhlaWdodCIsImhlYWRlckVsZW1lbnQiLCJ0ZW1wZXJhdHVyZUVsZW1lbnQiLCJkZXNjcmlwdGlvbkVsZW1lbnQiLCJodW1pZGl0eUVsZW1lbnQiLCJ3aW5kRWxlbWVudCIsInRleHRDb250ZW50IiwibG9jYXRpb25OYW1lIiwidGVtcCIsImNvbmRpdGlvbkRlc2NyaXB0aW9uIiwiaHVtaWRpdHkiLCJ3aW5kU3BlZWQiLCJiZWFjaFJhdGluZ0VsZW1lbnQiLCJiZWFjaFJhdGluZyIsImdldEJlYWNoUmF0aW5nIiwiYmVhY2hSYXRpbmdJbWFnZSIsImdpZlNlYXJjaFRlcm0iLCJnaWZEYXRhIiwic3JjIiwidXJsIiwiaXNSYWluIiwiY2xvdWRDb3ZlciIsIm1lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJNYWluVUlDb250cm9sbGVyIiwibWFpbiIsInJlbmRlclNlYXJjaCIsInJlbmRlclNlYXJjaFJlc3VsdHMiLCJzZWFyY2hDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwic2VhcmNoSW5wdXQiLCJjcmVhdGVTZWFyY2hJbnB1dCIsInNlYXJjaEJ1dHRvbiIsImNyZWF0ZVNlYXJjaEJ1dHRvbiIsImVycm9yQ29udGFpbmVyIiwiY3JlYXRlRXJyb3JDb250YWluZXIiLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZWFyY2hUZXJtIiwidmFsdWUiLCJvdXRsaW5lIiwicGxhY2Vob2xkZXIiLCJyZW1vdmVQcm9wZXJ0eSIsInNlYXJjaFJlc3VsdHNDb250YWluZXIiLCJyZW5kZXJXZWF0aGVyIiwicmVuZGVyQmVhY2hTY29yZSIsIndlYXRoZXJDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsImJlYWNoU2NvcmVDb250YWluZXIiLCJhcGlLZXkiLCJsaW1pdCIsInNlYXJjaFVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJnaWZzRGF0YSIsImpzb24iLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJlc3VsdHMiLCJtZWRpYV9mb3JtYXRzIiwidGlueWdpZiIsIndhc0NhbGxTdWNjZXNzIiwiYXBpVVJMIiwib2siLCJjb25zb2xlIiwibG9nIiwiZ2V0Q2FsbFN0YXR1cyIsInN0YXR1cyIsIm5hbWUiLCJzeXMiLCJjb3VudHJ5Iiwid2luZCIsInNwZWVkIiwiY2xvdWRzIiwiYWxsIiwid2VhdGhlciIsImRlc2NyaXB0aW9uIiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==