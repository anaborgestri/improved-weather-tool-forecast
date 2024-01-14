function refreshWeather(response) {
  //console.log(response.data);
  let cityTemp = response.data.temperature.current;
  let cityTempdegrees = document.querySelector("#temp-degrees");
  cityTempdegrees.innerHTML = Math.round(cityTemp);
  //to make sure that the city name always shows up correctly instead of small or capital letters entered by the users
  //the two elements from funtion 'findCity' need to be changed - in this case for tracebility they were just deactivated with the //
  //they are copied to this funtion and then the 'cityName element on the second request is changed as shown below
  //basically it is changed to get the info from the API, which is always correct (input.value changed to response.data.city;)
  let cityName = document.querySelector(".city");
  cityName.innerHTML = response.data.city;
  //this way independently how the city name is written by the user it will always show up correctly
  //add weather description
  let desciptionWeather = document.querySelector("#description");
  desciptionWeather.innerHTML = response.data.condition.description;
  //add remaining detals, wind, humidity and real feel temp
  let windspeedValue = document.querySelector("#windspeed");
  windspeedValue.innerHTML = response.data.wind.speed;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = Math.round(response.data.temperature.humidity);
  let realfeelTemp = document.querySelector("#realFeel");
  realfeelTemp.innerHTML = Math.round(response.data.temperature.feels_like);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
            src=${response.data.condition.icon_url}
                      class="weatherDetails-emoji"/> `;

  //get the hours and date directly from the API as well to do that we nee to use the tag new Date() and multiply by 1000 see console log below
  //console.log(new Date(response.data.time * 1000));
  //based on this we can design and structure the date in the app
  let timeStamp = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeStamp.innerHTML = formatDate(date);

  //add here the funtion to call the forecast, then we can delete on the bottom the give weather city. And inside of having the city we have the response.data.city
  //This way if we call it here we know that the city is well-spelled
  getForecast(response.data.city);
}

function formatDate(date) {
  let day = date.getDate();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let year = date.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  //need to add a condition in case the mnutes are less than 10 to have two digits$
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Updated | ${day} ${month} ${year} | ${hours}:${minutes}`;
}

function giveWeather(city) {
  let apiKey = `4c08634eb8b52t7acf769o96f5812f64`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function findCity(event) {
  event.preventDefault();
  let input = document.querySelector("#form-search-city");
  //let cityName = document.querySelector(".city");
  // cityName.innerHTML = input.value;
  giveWeather(input.value);
}
function getForecast(city) {
  let apiKey = `4c08634eb8b52t7acf769o96f5812f64`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//FORECAST JS
function displayForecast(response) {
  console.log(response);
  let forecast = document.querySelector("#forecastDays");

  //need to add a loop so this html text shows up 5 times, calling the funtion 5 times does not work on its own. Create a new array
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //create a funtion to call it for each day of the created array
  //if we would stop here only the last day of the array would be called so we need to concatonate a string a massive string. SO we need to create a new variable that will be empty for now
  let forecastHtml = "";
  //then we will need to say that we want this variable to be played / called again and again. For that we add forecastHtml = forescastHtml + `teh html text that we want to inject` - see below
  // finally we need to create the final loop, we need to add in the end forecast.innerHTML = forecastHtml;
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<li class="forecastDays">
  <span class="days">${day}</span>
  <ul class="forecastDays">
    <li class="temperature-emoji">🌤️</li>
    <li>
      <span class="temperature-forecast-max">12</span>
      <span class="temperature-forecast-min">9</span>
    </li>
    <li class="wind">
      <div class="forecastemoji">
        <img src="images/storm.png" class="forecastemoji" />
      </div>
      <div class="wind-value">
        2<br />
        km/h
      </div>
    </li>
    <li class="humidity">
      <div class="forecastemoji">
        <img src="images/humidity (1).png" class="forecastemoji" />
      </div>
      <div class="humidity-value">
        65
        <br />%
      </div>
    </li>
    <li class="realFeel">
      <div class="forecastemoji">
        <img src="images/thermal.png" class="forecastemoji" />
      </div>
      <div class="precipitation-value">
        0<br />%
      </div>
    </li>
  </ul>
</li>`;
  });
  //finally we need to create the final loop
  forecast.innerHTML = forecastHtml;
}

let searchCityform = document.querySelector("#search-form");
searchCityform.addEventListener("submit", findCity);

//by the functionality added below we do not need to have the city and weather details in the html. everytime that is refreashed it will just show the details from the city that is below in brackets
giveWeather("Basel");
