"use strict";
const btn = document.querySelector('button');
var API;
(function (API) {
    API["URL"] = "https://api.openweathermap.org/data/2.5/onecall?";
    API["KEY"] = "4a4ab074aeb49884894507b1d4c9efb9";
})(API || (API = {}));
;
const POS = {
    LAT: '',
    LON: ''
};
btn.addEventListener('click', () => getLocation());
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    else {
        console.log(`Sorry, we can not share weather without your gelocation.`);
    }
};
const getPosition = (position) => {
    try {
        POS.LAT = position.coords.latitude;
        POS.LON = position.coords.longitude;
        getWeather();
    }
    catch (error) {
        console.log(`Something went wrong`);
    }
};
const getWeather = () => {
    try {
        const getDate = new Date().getTime();
        fetch(`${API.URL}lat=${POS.LAT}&lon=${POS.LON}&dt=${getDate}&units=metric&appid=${API.KEY}`)
            .then(res => res.json())
            .then(res => setWeather(res))
            .catch(err => console.log(err));
    }
    catch (error) {
        console.log(`Something went wrong`);
    }
};
const setWeather = (res) => {
    let current = {
        place: '',
        temp: '',
        desc: '',
        fore: {
            max: '',
            min: ''
        },
        clouds: '',
        feeltemp: '',
        sunrise: '',
        sunset: '',
        humidity: '',
        pressure: ''
    };
    current.place = res.timezone.split('/')[1];
    current.temp = Math.round(res.current.temp);
    current.desc = res.current.weather[0].main;
    current.fore.max = Math.round(res.daily[0].temp.max);
    current.fore.min = Math.round(res.daily[0].temp.min);
    current.clouds = res.current.clouds;
    current.feeltemp = Math.round(res.current.feels_like);
    current.sunrise = new Date(res.current.sunrise * 1000).toLocaleTimeString().slice(0, 4);
    current.sunset = new Date(res.current.sunset * 1000).toLocaleTimeString().slice(0, 4);
    current.humidity = res.current.humidity;
    current.pressure = res.current.pressure;
    document.getElementById('place').innerText = `${current.place}`;
    document.getElementById('temp').innerText = `${current.temp}°`;
    document.getElementById('desc').innerText = `${current.desc}`;
    document.getElementById('fore').innerText = `H:${current.fore.max}° L:${current.fore.min}°`;
    document.getElementById('clouds').innerText = `${current.clouds}%`;
    document.getElementById('feel').innerText = `${current.feeltemp}°`;
    document.getElementById('sunrise').innerText = `${current.sunrise} AM`;
    document.getElementById('sunset').innerText = `${current.sunset} PM`;
    document.getElementById('humidity').innerText = `${current.humidity}%`;
    document.getElementById('pressure').innerText = `${current.pressure}hPa`;
};
