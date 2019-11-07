class Data {
  constructor() {
    this.inputCurrentWeather = document.querySelector(
      ".current_weather__form_input"
    );
  }

  getData = async e => {
    e.preventDefault();

    const value = this.inputCurrentWeather.value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=3d6493aafbad9b098bf791538cc79cb6`;
    //console.log(city);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
}
