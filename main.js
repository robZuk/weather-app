const form = document.querySelector("form");
const inputSearch = document.querySelector(".search");
const image = "assets/default-image.png";

//console.log(inputSearch);

const getData = e => {
  e.preventDefault();
  const value = inputSearch.value;
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=7639715c700c06ad95278d15fad9a110`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=7639715c700c06ad95278d15fad9a110`;
  fetch(url)
    .then(response => {
      //console.log(response);
      if (response.status !== 200) {
        throw Error("To nie jest odpowiedź 200");
      } else {
        return response.json();
      }
    })
    .then(json => {
      console.log(json);
      showData(json);
    })
    .catch(err => console.log(err));
};

const showData = result => {
  const resultArea = document.querySelector(".weather-list");
  resultArea.textContent = "";
  resultArea.innerHTML = ` 
  <div class = "weather__temp">Temperature: ${result.main.temp}</div>
  <div class = "weather__pressure">Pressure:${result.main.pressure}</div>
  <div class = "weather__humidity">Humidity:${result.main.humidity}</div>
  `;
  // <div class = "film_status">Status: ${film.show.status}</div>s
  // <div class = "film__date">Relase date: ${
  //   film.show.premiered === null ? "brak danych" : film.show.premiered
  // }</div>
  // <div class = "film__rating">Rating: ${
  //   film.show.rating.average === null ? "brak ocen" : film.show.rating.average
  // }</div>
  // <div class = "film__description">Description:${
  //   film.show.summary === null ? "brak opisu" : film.show.summary
  // }</div>
  // <img class = "default__image" src=${
  //   film.show.image === null ? image : film.show.image.medium
  // }>
  //resultArea.appendChild|(item);
  // });
};
inputSearch.addEventListener("input", getData);
