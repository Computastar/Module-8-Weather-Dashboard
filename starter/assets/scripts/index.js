let cityFormElement=document.querySelector("#city-search-form");
let cityInputElement=document.querySelector("#city");
let citySearchInputEl = document.querySelector("#searched-city");
let weatherContainerEl=document.querySelector("#current-weather-block");
let forecastTitleEl = document.querySelector("#forecast");
let forecastContainerEl = document.querySelector("#five-day-container");
let pastSearchBtnElement = document.querySelector("#past-search-buttons");

var weatherData = weatherData;

getCityWeather = function(city){

    if(city){
      console.log(city)
      const apiKey = "2726ba0963847f452e627fcd003602d0"
      const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      var weatherData 
      return $.ajax({
        url: queryURL,
        method: "GET",
        async: false,

        success : function(weatherDataResponse) {

         weatherData = weatherDataResponse;

      //displayWeather(weatherData, city);
      //console.log(JSON.stringify(weatherData),city)
        //console.log(weatherData)
        return weatherData;
        }
    });
  }
  };

let displayWeather = function (weatherData, city) {
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

const display5Day = function(weatherData){
  forecastContainerEl.textContent = " "
  forecastTitleEl.textContent = "5-Day Forecast:";
  forecastContainerEl.classList = "d-flex justify-content-between";

  console.log(weatherData)
console.log("in the loop")
  const forecast =  weatherData.list;
      for(var i=5; i < forecast.length; i=i+6){
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
  
   var cities = [];

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
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

var clearPastSearch = function(){
  forecastContainerEl.innerHTML=""
  pastSearchBtnElement.innerHTML=""
  forecastTitleEl.innerHTML=""
  weatherContainerEl.innerHTML=""
  citySearchInputEl.innerHTML=""
}
document.getElementById("clearCity").addEventListener("click", clearPastSearch)



cityFormElement.addEventListener("submit", formSumbitAction);
pastSearchBtnElement.addEventListener("click", pastSearchHandler);

  var formSumbitAction = function(event){
    event.preventDefault();

    var city = cityInputElement.value.trim();
    if(city){
        var weatherData = getCityWeather(city);
        weatherData = weatherData.responseJSON;
        //console.log(weatherData)
        displayWeather(weatherData, city);
        display5Day(weatherData, city)
        cities.unshift({city});
        saveSearch();
        pastSearch(city);
    } else{
        alert("Please enter a City Name!");
    }
  }

  cityFormElement.addEventListener("submit", formSumbitAction);