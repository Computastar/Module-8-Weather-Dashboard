/* Create variables for html elements*/
let cityFormElement = document.querySelector("#city-search-form");
let cityInputElement = document.querySelector("#city");
let citySearchInputEl = document.querySelector("#searched-city");
let weatherContainerEl = document.querySelector("#current-weather-block");
let forecastTitleEl = document.querySelector("#forecast");
let forecastContainerEl = document.querySelector("#five-day-container");
let pastSearchBtnElement = document.querySelector("#past-search-buttons");

/* Create varibles for functions */
const apiKey = "2726ba0963847f452e627fcd003602d0";
var weatherData;
let notFound = new Boolean();
var cities = [];

/* Function to call Weather api query by city in search box
   Returns full ajax query so can be used as JSON list
*/
function getWeatherByCity(city) {
  if (city) {
    console.log(city);

    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    return $.ajax({
      url: queryURL,
      method: "GET",
      async: false,

      success: function (weatherDataResponse) {
        weatherData = weatherDataResponse;

        return weatherData;
      },
    });
  }
}

/* Function to get Weather api data by using gelocation service
   user needs to allow access for the is to work, again returns entire 
   call to JSON.
*/
function getWeatherByLocation(coord) {
  if (coord) {
    const lat = coord[0];
    const lon = coord[1];

    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    return $.ajax({
      url: queryURL,
      method: "GET",
      async: false,

      success: function (weatherDataResponse) {
        weatherData = weatherDataResponse;

        return weatherData;
      },
    });
  }
}

/* Function to build out the HTML elements with the data returned to WeatherData JSON
   as this is just today's data, just use the first element. City is passed as a param from 
   the search box form
*/
function displayTodaysWeather(weatherData, city) {
  //clear old weather content
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = city;

  // Get array element s from list
  weatherData = weatherData.list;

  // Build out  City and Date HTML elements
  let currentDate = document.createElement("span");
  currentDate.textContent = moment(weatherData[0].dt.value).format(
    " (D/MM/YYYY)"
  );
  citySearchInputEl.appendChild(currentDate);

  //create an image element for icon displayed
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`
  );
  citySearchInputEl.appendChild(weatherIcon);

  //create a span element to for temperature data
  let tempElement = document.createElement("span");
  tempElement.textContent = "Temp: " + weatherData[0].main.temp + " °C";
  tempElement.classList = "list-group-item";

  //append to temp container
  weatherContainerEl.appendChild(tempElement);

  //create a span element to for Wind data
  let windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind: " + weatherData[0].wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item";

  //append to wind speed container
  weatherContainerEl.appendChild(windSpeedEl);

  //create a span element to for Humidity data
  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weatherData[0].main.humidity + "%";
  humidityEl.classList = "list-group-item";

  //append to humidity container
  weatherContainerEl.appendChild(humidityEl);
}

/* Function to use the WeatherData JSON for the 5 day forecast
   Loops i for 5 as in 5 days, increments i by + 8, because  the data
   is returned for every 3 hours, so 3 * 8 = 24 = 1 day
*/
function displayFiveDayWeather(weatherData) {
  forecastContainerEl.textContent = " ";
  forecastTitleEl.textContent = "5-Day Forecast:";
  forecastContainerEl.classList = "d-flex justify-content-between";

  const forecast = weatherData.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var forecastEl = document.createElement("div");
    forecastEl.classList = "d-flex card bg-secondary text-white mr-2 ml-1";

    //create date element
    let forecastDate = document.createElement("h5");
    forecastDate.textContent = moment.unix(forecast[i].dt).format("DD/MM/YY");
    forecastDate.classList = "card-header text-center bg-primary";
    forecastEl.appendChild(forecastDate);

    //create an image icon element
    let weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center ";
    weatherIcon.id = weatherIcon + [i]
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`
    );

    //append to forecast card
    forecastEl.appendChild(weatherIcon);

    //create temperature span
    var forecastTempEl = document.createElement("span");
    forecastTempEl.classList = "card-body text-center bg-info";
    forecastTempEl.textContent = "Temp: " + forecast[i].main.temp + " °C";

    //append to forecast card
    forecastEl.appendChild(forecastTempEl);

    //create wind span
    var forecastWindspeedEl = document.createElement("span");
    forecastWindspeedEl.classList = "card-body text-center bg-info";
    forecastWindspeedEl.textContent = "Wind: " + forecast[i].wind.speed + " MPH";

    //append to forecast card
    forecastEl.appendChild(forecastWindspeedEl);

    //create humidity span
    var forecastHumidityEl = document.createElement("span");
    forecastHumidityEl.classList = "card-body text-center";
    forecastHumidityEl.textContent = "Humidity: " + forecast[i].main.humidity + "%";

    //append to forecast card
    forecastEl.appendChild(forecastHumidityEl);

    //append to five day container
    forecastContainerEl.appendChild(forecastEl);
  }
}

/* Function to save the City Search List to local storage */
function saveSearch() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

/* Function to build out HTML element for the City Search Saved List*/
function pastSearch(pastSearch) {
  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city", pastSearch);
  pastSearchEl.setAttribute("type", "submit");

  pastSearchBtnElement.prepend(pastSearchEl);
}

/* Function to get the WeatherDate by clicking on a City in the 
   City Search Saved List
*/
var pastSearchHandler = function (event) {
  var city = event.target.getAttribute("data-city");
  getWeatherData(city);
};

/* Function to clear out the HTML elements created by the 
   City Search Save List. Uses the notFound varible so if a city
   is 404 not found, it is not added to list
*/
function clearPastSearch(notFound) {
  if (notFound) {
    forecastContainerEl.innerHTML = "";
    forecastTitleEl.innerHTML = "";
    weatherContainerEl.innerHTML = "";
    citySearchInputEl.innerHTML = "";
  } else {
    forecastContainerEl.innerHTML = "";
    pastSearchBtnElement.innerHTML = "";
    forecastTitleEl.innerHTML = "";
    weatherContainerEl.innerHTML = "";
    citySearchInputEl.innerHTML = "";
  }
}

/* Function convert City search box input to first capialise */
function toUpper(inputString) {
  return inputString.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
}

/* Function to get the WeatherData by City api
   Checks the return to see if city exist if not display error
   else call the functions to build out the HTML
*/
var getWeatherData = function (city) {
  let weatherData = getWeatherByCity(city);

  if (weatherData.status === 404) {
    alert("City not found");
    notFound = true;
    clearPastSearch(notFound);
  } else {
    notFound = false;
    weatherData = weatherData.responseJSON;
    displayTodaysWeather(weatherData, city);
    displayFiveDayWeather(weatherData);
  }
};

/* Function for the City search button
   Again checks city exists before continuing to build out HTML
*/
function getCity(event) {
  event.preventDefault();

  var city = cityInputElement.value.trim();

  city = toUpper(city);

  if (city) {
    getWeatherData(city);

    if (!notFound) {
      cities.unshift({ city });
      saveSearch();
      pastSearch(city);
    }
  } else {
    alert("Please enter a City Name!");
  }
  cityInputElement.value = "";
}

/* Function to get location co-ordinates from geolocation api
   uses callack function as its async and the data isnt returned 
   if you try to assign variable to it
*/
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation, showError);
}

/* Function to call WeatherData api,
   check city exists and build out HTML elements.
   Uses weatherData.city.name for City to pass to
   displayTodaysWeather
*/
function showLocation(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  let weatherData = getWeatherByLocation([lat, lon]);

  if (weatherData.status === 404) {
    alert("location not found");
    notFound = true;
    clearPastSearch(notFound);
  } else {
    notFound = false;
    weatherData = weatherData.responseJSON;

    city = weatherData.city.name;
    displayTodaysWeather(weatherData, city);
    displayFiveDayWeather(weatherData);

    if (!notFound) {
      cities.unshift({ city });
      saveSearch();
      pastSearch(city);
    }
  }
}

/* Function to display error message from
   navigator.geolocation - is a bit tempremental
*/
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}


/* Listening event handelers for HTML elements */
document.getElementById("search").addEventListener("click", getCity);
document.getElementById("useLocation").addEventListener("click", getLocation);
document.getElementById("clearCity").addEventListener("click", function () {
  clearPastSearch(false);
});
pastSearchBtnElement.addEventListener("click", pastSearchHandler);

