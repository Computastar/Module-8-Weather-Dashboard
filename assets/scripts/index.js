let cityFormElement=document.querySelector("#city-search-form");
let cityInputElement=document.querySelector("#city");
let citySearchInputEl = document.querySelector("#searched-city");
let weatherContainerEl=document.querySelector("#current-weather-block");
let forecastTitleEl = document.querySelector("#forecast");
let forecastContainerEl = document.querySelector("#five-day-container");
let pastSearchBtnElement = document.querySelector("#past-search-buttons");

const apiKey = "2726ba0963847f452e627fcd003602d0"
var weatherData;
let notFound = new Boolean();
var cities = [];

getWeatherByCity = function(city){

    if(city){
      console.log(city)

      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      var weatherData 
      return $.ajax({
        url: queryURL,
        method: "GET",
        async: false,

        success : function(weatherDataResponse) {

         weatherData = weatherDataResponse;

        return weatherData;
        }
    });
  };
}

getWeatherByLocation = function(coord) {
  if(coord){
    console.log(coord[0] + " " + coord[1])
    const lat = coord[0];
    const lon = coord[1];

  
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    var weatherData 
    return $.ajax({
      url: queryURL,
      method: "GET",
      async: false,

      success : function(weatherDataResponse) {

       weatherData = weatherDataResponse;

      return weatherData;
      }
  });
}
}

let displayTodaysWeather = function (weatherData, city) {
  //clear old weather content
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = city;

  weatherData = weatherData.list

  let currentDate = document.createElement("span");
  currentDate.textContent = moment(weatherData[0].dt.value).format(" (D/MM/YYYY)");
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
  humidityEl.textContent =
    "Humidity: " + weatherData[0].main.humidity + "%";
  humidityEl.classList = "list-group-item";

  //append to humidity container
  weatherContainerEl.appendChild(humidityEl);
};

const displayFiveDayWeather = function(weatherData){
  forecastContainerEl.textContent = " "
  forecastTitleEl.textContent = "5-Day Forecast:";
  forecastContainerEl.classList = "d-flex justify-content-between";

  console.log(weatherData)
console.log("in the loop")
  const forecast =  weatherData.list;
      for(var i=5; i < forecast.length; i=i+8){
      console.log(forecast[i])
    
     
     var forecastEl=document.createElement("div");
     forecastEl.classList = "d-flex card bg-secondary text-white mr-2 ml-1";
     
     //console.log(dailyForecast)

     //create date element
     let forecastDate = document.createElement("h5")
     forecastDate.textContent = moment.unix(forecast[i].dt).format("D/MM/YY");
     forecastDate.classList = "card-header text-center bg-primary"
     forecastEl.appendChild(forecastDate);
    

      //create an image icon element
      let weatherIcon = document.createElement("img")
      weatherIcon.classList = "card-body text-center";
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`);  

      //append to forecast card
      forecastEl.appendChild(weatherIcon);
      
      //create temperature span
      var forecastTempEl=document.createElement("span");
      forecastTempEl.classList = "card-body text-center bg-info";
      forecastTempEl.textContent = "Temp: " + forecast[i].main.temp + " °C";

       //append to forecast card
       forecastEl.appendChild(forecastTempEl);

              // create wind span
      var forecastWindspeedEl=document.createElement("span");
      forecastWindspeedEl.classList = "card-body text-center bg-info";
      forecastWindspeedEl.textContent = "Wind: " + forecast[i].wind.speed + " MPH";

      //append to forecast card
      forecastEl.appendChild(forecastWindspeedEl);


     //create humidity span
      var forecastHumidityEl=document.createElement("span");
      forecastHumidityEl.classList = "card-body text-center";
      forecastHumidityEl.textContent = "Humidity: " + forecast[i].main.humidity + "%";

      //append to forecast card
      forecastEl.appendChild(forecastHumidityEl);
      
       console.log(forecastEl);
      //append to five day container
       forecastContainerEl.appendChild(forecastEl);
      }
   }
  


   var saveSearch = function(){
    console.log(cities)
    localStorage.setItem("cities", JSON.stringify(cities));
  };

  var pastSearch = function(pastSearch){
     // console.log(pastSearch)
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchBtnElement.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    // pastSearchBtnElement.innerHTML= " ";
    var city = event.target.getAttribute("data-city");
    console.log('event.target', event.target);
    
    getWeatherData(city);

    }


var clearPastSearch = function(notFound){
if (notFound) {
  forecastContainerEl.innerHTML=""
  forecastTitleEl.innerHTML=""
  weatherContainerEl.innerHTML=""
  citySearchInputEl.innerHTML=""
  } 
  else 
  {
  forecastContainerEl.innerHTML=""
  pastSearchBtnElement.innerHTML=""
  forecastTitleEl.innerHTML=""
  weatherContainerEl.innerHTML=""
  citySearchInputEl.innerHTML=""
  }
 
}

document.getElementById("clearCity").addEventListener("click", function(){clearPastSearch(false)})

pastSearchBtnElement.addEventListener("click", pastSearchHandler);


var toUpper = function(inputString){
  return inputString.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

var getWeatherData = function(city){
  
  let weatherData = getWeatherByCity(city);

  if (weatherData.status === 404){
    alert("City not found")
    notFound = true;
    clearPastSearch(notFound);
  }
    else {
      notFound=false
  weatherData = weatherData.responseJSON;
  displayTodaysWeather(weatherData,city);
  displayFiveDayWeather(weatherData)
}
}

  var formSumbitAction = function(event){
    event.preventDefault();

    var city = cityInputElement.value.trim();

    city = toUpper(city)

    if(city) {

        getWeatherData(city)

        if (!notFound) {
        cities.unshift({city});
        saveSearch();
        pastSearch(city);
         }
        }
    else{
        alert("Please enter a City Name!");
    }
  }

function getLocationOld(callback, event) {
  event.preventDefault();

    const position = {
      lat: null,
      lon: null
    };

    navigator.geolocation.getCurrentPosition(showError)

    console.log(position)
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat + " " + lon)

    return callback(position)

}

 function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation,showError);

  }



  function showLocation(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat + " " + lon);

    let weatherData = getWeatherByLocation([lat, lon]);
    console.log(weatherData);

    if (weatherData.status === 404) {
      alert("location not found");
      notFound = true;
      clearPastSearch(notFound);
    } else {
      notFound = false;
      weatherData = weatherData.responseJSON;
      console.log(weatherData);

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

  
  function showError(error) {
    switch(error.code) {
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


  //cityFormElement.addEventListener("submit", formSumbitAction);
  document.getElementById("search").addEventListener("click", formSumbitAction)
  document.getElementById("useLocation").addEventListener("click",getLocation)