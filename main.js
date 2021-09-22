const api = {
    key: "f0dae6d56d217becbe206dc4e0dd5125",
    baseURL: "https://api.openweathermap.org/data/2.5/"
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keydown', setquery);

function setquery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(date){
    let today = days[date.getDay()];
    let dateToday = date.getDate();
    let thisMonth = months[date.getMonth()];
    let thisYear = date.getFullYear();

    return `${today} ${dateToday} ${thisMonth} ${thisYear}`;
}