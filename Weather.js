class Weather {
  constructor() {
    this.formCurrentWeather = document.querySelector(".current_weather__form");
    this.button = document.querySelector(".current_weather__form_btn");

    this.data = new Data();
    this.show = new Show();
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // getData(e) {
  //   this.data.getData(e).then(data => {
  //     return data;
  //   });
  // }

  getDataOnSubmit() {
    this.formCurrentWeather.addEventListener("submit", e => {
      this.data.getData(e).then(data => {
        this.show.showCurrentWeatherData(data);
        this.show.listForecastWeather.classList.remove("active");
      });
    });
  }

  showDataOnClick() {
    this.show.btnForecastWeather.addEventListener("click", e => {
      this.data.getData(e).then(data => {
        this.show.listForecastWeather.classList.add("active");
        this.show.showHourlyForecastData(data);
      });
    });
  }
}
