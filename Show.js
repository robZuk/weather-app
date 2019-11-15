class Show {
  constructor() {
    this.resultAreaCurrentWeather = document.querySelector(
      ".current_weather__list"
    );
    this.listForecastWeather = document.querySelector(
      ".current_weather__hourly_forecast__list"
    );
    this.btnForecastWeather = document.querySelector(
      ".current_weather__hourly_forecast__btn"
    );
    // this.data = new Data();
    // this.data.getData(e).then(data => {
    //   console.log(data);
    // });
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
    <div class="current_weather__list_header">
    <div class="current_weather__list_header__city">Weather in ${result.city.name}, ${result.city.country}</div>
    <img class="current_weather__list_header__img" src="http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png">
    <div class="current_weather__list_header__temp">${temperature} &#176;C</div>
    <div class="current_weather__list_header__description">${result.list[0].weather[0].description}</div>
    <div class="current_weather__list_header__date">${date}</div>
    </div>
    <table class="current_weather__list_main">
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
    console.log(result);
    this.listForecastWeather.textContent = "";
    const title = `<div class="current_weather__hourly_forecast_list__title">5 day forecast weather for ${result.city.name}</div>`;
    this.listForecastWeather.innerHTML += title;
    result.list.forEach((list, index) => {
      const date = list.dt_txt.substring(0, 10);
      const time = list.dt_txt.substring(11, 16);
      const temperature = (list.main.temp - 273.15).toFixed(0);
      let content = "";

      time === "00:00" || index === 0 //add date only one a day
        ? (content += `<div class="date">Date: ${date}</div>`)
        : null;

      content += `<div class="forecast_weather__list_block1">
            <div class="forecast_weather__list_block1_img_time">Time: ${time}</div>
            <img class="forecast_weather__list_block1_img" src="http://openweathermap.org/img/wn/${list.weather[0].icon}.png">
            </div>
            <div class="forecast_weather__list_block2">
            <div class="forecast_weather__list_block2_temp">${temperature} &#176;C </div>
            <div class="forecast_weather__list_block2_description">${list.weather[0].description}</div>
            <div class="forecast_weather__list_block2_temp">${list.wind.speed}m/s, </div>
            <div class="forecast_weather__list_block2_clouds">Clouds ${list.clouds.all}%, </div>
            <div class="forecast_weather__list_block2_clouds">${list.main.pressure} hpa </div>
            </div>`;
      this.listForecastWeather.innerHTML += content;
      this.btnForecastWeather.classList.remove("active");
    });
  };
}
