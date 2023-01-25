let cityFormElement=document.querySelector("#city-search-form");
let cityInputElement=document.querySelector("#city");
let citySearchInputEl = document.querySelector("#searched-city");
let weatherContainerEl=document.querySelector("#current-weather-block");


const getCityWeather = function(city){
    if(city){
      const apiKey = "2726ba0963847f452e627fcd003602d0"
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
      fetch(apiURL)
      .then(function(response){
          response.json().then(function(data){
            console.log(JSON.stringify(data),city)
            
              displayWeather(data, city);
          });
      });
    }
  };

let displayWeather = function (weatherData, city) {
   //clear old weather content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=city;

  let currentDate = document.createElement("span");
  currentDate.textContent = moment(weatherData.dt.value).format(
    "dddd, MMMM D, YYYY, H:mm a"
  );
  citySearchInputEl.appendChild(currentDate);

  //create an image element for icon displayed
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  );
  citySearchInputEl.appendChild(weatherIcon);

  //create a span element to for temperature data
  let tempElement = document.createElement("span");
  tempElement.textContent = "Current Temp: " + weatherData.main.temp + " °C";
  tempElement.classList = "list-group-item";

     //append to temp container
     weatherContainerEl.appendChild(tempElement);

        //create a span element to for Humidity data
   let humidityEl = document.createElement("span");
   humidityEl.textContent = "Level Humidity: " + weatherData.main.humidity + " %";
   humidityEl.classList = "list-group-item"

      //append to humidity container
      weatherContainerEl.appendChild(humidityEl);

   //create a span element to for Wind data
   let windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weatherData.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

      //append to wind speed container
      weatherContainerEl.appendChild(windSpeedEl);
  
};

  var formSumbitAction = function(event){
    event.preventDefault();

    var city = cityInputElement.value.trim();
    if(city){
        getCityWeather(city);
    } else{
        alert("Please enter a City Name!");
    }
  }

  cityFormElement.addEventListener("submit", formSumbitAction);