let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

let city = "Ludhiana";

/***** Country Name Function *****/

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], {
    type: "region",
  }).of(code);
};

/***** Current Date & Time Function *****/

const getCurrentDateTime = () => {
  const now = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(now);
};

/***** Weather API Function *****/

const getWeatherData = async () => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0b06669a793506ae54060f7df8a5fb6`;

  try {
    const res = await fetch(weatherURL);
    const data = await res.json();

    console.log(data);

    const { main, name, weather, wind, sys } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;

    dateTime.innerHTML = getCurrentDateTime();

    w_forecast.innerHTML = weather[0].main;

    w_icon.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />
    `;

    w_temperature.innerHTML = `${(
      main.temp - 273.15
    ).toFixed()}°C`;

    w_minTem.innerHTML = `Min: ${(
      main.temp_min - 273.15
    ).toFixed()}°C`;

    w_maxTem.innerHTML = `Max: ${(
      main.temp_max - 273.15
    ).toFixed()}°C`;

    w_feelsLike.innerHTML = `${(
      main.feels_like - 273.15
    ).toFixed()}°C`;

    w_humidity.innerHTML = `${main.humidity}%`;

    w_wind.innerHTML = `${wind.speed} m/s`;

    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

/***** Search Functionality *****/

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const cityInput = document.querySelector(".city_name");

  city = cityInput.value;

  getWeatherData();

  cityInput.value = "";
});

/***** Initial Load *****/

window.addEventListener("load", () => {
  getWeatherData();

  setInterval(() => {
    dateTime.innerHTML = getCurrentDateTime();
  }, 1000);
});