let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];
let month = months[now.getMonth()];

function time() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  time = `${hour} : ${min}`;

  return time;
}
let currentDay = document.querySelector("#Current-day");
let curentDate = document.querySelector("#Current-date");

currentDay.innerHTML = `${day} ${time()}`;
curentDate.innerHTML = `${now.getDate()}. ${month}`;

function city(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#city");
  let mainCity = document.querySelector("#mainCity");
  mainCity.innerHTML = changeCity.value;
  let apiKey = "a2c12ca339db823fd39c58b7ef7264d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${mainCity.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", city);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = `  ${temperature} ℃ `;
  let mainCity = document.querySelector("#mainCity");
  mainCity.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let winD = document.querySelector("#wind");
  winD.innerHTML = ` Windspeed: ${response.data.wind.speed} %`;
}

function showPosition(position) {
  //console.log(position);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "a2c12ca339db823fd39c58b7ef7264d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geo = document.querySelector("#geo");
geo.addEventListener("click", geoLocation);
