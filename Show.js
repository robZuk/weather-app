class Show {
  constructor() {
    this.resultAreaCurrentWeather = document.querySelector(
      ".current_weather_list"
    );
    this.listForecastWeather = document.querySelector(
      ".current_weather_hourly_forecast_list"
    );
    this.btnForecastWeather = document.querySelector(
      ".current_weather_hourly_forecast__btn"
    );
  }

  showCurrentWeatherData = result => {
    if (result.cod === "404") {
      this.resultAreaCurrentWeather.innerHTML = "No city found";
      this.listForecastWeather.classList.remove("active");
      this.btnForecastWeather.classList.remove("active");
    }
    const sunrise = new Date(result.city.sunrise * 1000)
      .toLocaleTimeString()
      .substring(0, 5); //*1000 pozbywamy się milisekund
    const sunset = new Date(result.city.sunset * 1000)
      .toLocaleTimeString()
      .substring(0, 5);
    const date = new Date().toDateString();
    const temperature = (result.list[0].main.temp - 273.15).toFixed(0);
    this.resultAreaCurrentWeather.textContent = "";
    const content = `
    <div class="current_weather_list_header">
    <div class="current_weather_list_header__city">Weather in ${result.city.name}, ${result.city.country}</div>
    <img class="current_weather_list_header__img" src="http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png">
    <div class="current_weather_list_header__temp">${temperature} &#176;C</div>
    <div class="current_weather_list_header__description">${result.list[0].weather[0].description}</div>
    <div class="current_weather_list_header__date">${date}</div>
    </div>
    <table class="current_weather_list_main">
    <tr><td>Sunrise</td><td>${sunrise}</td></tr>
    <tr><td>Sunset</td><td>${sunset}</td></tr>
    <tr><td>Pressure</td><td>${result.list[0].main.pressure} hpa</td></tr>
    <tr><td>Humidity</td><td>${result.list[0].main.humidity} %</td></tr>
    <tr><td>Cloudiness</td><td>${result.list[0].clouds.all} %</td></tr>
    <tr><td>Wind</td><td>${result.list[0].wind.speed} m/s</td></tr>
    </table>
    `;

    this.resultAreaCurrentWeather.innerHTML = content;
    this.btnForecastWeather.classList.add("active");
  };

  showHourlyForecastData = result => {
    this.listForecastWeather.textContent = "";
    const title = `<div class="current_weather_hourly_forecast_list__title">5 day forecast weather for ${result.city.name}</div>`;
    this.listForecastWeather.innerHTML += title;
    result.list.forEach((list, index) => {
      const date = new Date(list.dt_txt).toDateString();
      const time = list.dt_txt.substring(11, 16);
      const temperature = (list.main.temp - 273.15).toFixed(0);
      let content = "";

      time === "00:00" || index === 0 //add date only one a day
        ? (content += `<div class="current_weather_hourly_forecast_list__date">${date}</div>`)
        : null;

      time !== "21:00"
        ? (content += `
            <div class="current_weather_hourly_forecast_list_block1 border-bottom">`)
        : (content += `
            <div class="current_weather_hourly_forecast_list_block1">`);
      content += `
            <div class="current_weather_hourly_forecast_list_block1__time">${time}</div>
            <img class="current_weather_hourly_forecast_list_block1__image" src="http://openweathermap.org/img/wn/${list.weather[0].icon}.png">
            </div>`;
      time !== "21:00"
        ? (content += `
            <div class="current_weather_hourly_forecast_list_block2 border-bottom">`)
        : (content += `
            <div class="current_weather_hourly_forecast_list_block2">`);
      content += `
            <div class="current_weather_hourly_forecast_list_block2__temp">${temperature} &#176;C </div>
            <div class="current_weather_hourly_forecast_list_block2__description">${list.weather[0].description}</div>
            <div class="current_weather_hourly_forecast_list_block2__wind">${list.wind.speed}m/s, </div>
            <div class="current_weather_hourly_forecast_list_block2__clouds">Clouds ${list.clouds.all}%, </div>
            <div class="current_weather_hourly_forecast_list_block2__pressure">${list.main.pressure} hpa </div>
            </div>`;

      this.btnForecastWeather.classList.remove("active");
      this.listForecastWeather.innerHTML += content;
    });
  };
}
