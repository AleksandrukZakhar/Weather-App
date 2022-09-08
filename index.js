const KEY = "dfa0fc71cd912959d3815771c5d574d1";
const input = document.querySelector("input");
const search = document.querySelector(".search");
const main = document.querySelector("main");
const circleContainer = document.querySelector(".circle-container");
let weatherContainers = null;

input.addEventListener("input", () => {
    search.classList.add("show");
});

search.addEventListener("click", () => {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${KEY}&units=metric`;
    input.value = "";
    search.classList.remove("show");

    getWeather(url);
});

let count = 0;
const dot = document.getElementById(count);
dot.classList.add("blue");

document.getElementById("prev").addEventListener("click", () => {
    if (count === 0) {
        count = 5 - 1;

        const prevdot = document.getElementById(0);
        prevdot.classList.remove("blue");

        const prevContainer = weatherContainers[0];
        prevContainer.classList.remove("show-weather");
    } else count--;

    weatherContainers[count].classList.add("show-weather");

    const prevdot = document.getElementById(count + 1);
    if (prevdot !== null && prevdot !== undefined)
        prevdot.classList.remove("blue");

    const prevContainer = weatherContainers[count + 1];
    if (prevContainer !== null && prevContainer !== undefined)
        prevContainer.classList.remove("show-weather");

    const dot = document.getElementById(count);
    dot.classList.add("blue");
});

document.getElementById("next").addEventListener("click", () => {
    if (count === 5 - 1) {
        count = 0;

        const prevdot = document.getElementById(5 - 1);
        prevdot.classList.remove("blue");

        const prevContainer = weatherContainers[5 - 1];
        prevContainer.classList.remove("show-weather");
    } else count++;

    weatherContainers[count].classList.add("show-weather");

    const prevdot = document.getElementById(count - 1);
    if (prevdot !== null && prevdot !== undefined)
        prevdot.classList.remove("blue");

    const prevContainer = weatherContainers[count - 1];
    if (prevContainer !== null && prevContainer !== undefined)
        prevContainer.classList.remove("show-weather");

    const dot = document.getElementById(count);
    dot.classList.add("blue");
});

const renderData = (data) => {
    const renderHtml = (x, weatherContainer) => {
        const container = document.createElement("div");
        container.classList.add("container");
        weatherContainer.appendChild(container);

        const icon = new Image();
        icon.src = `http://openweathermap.org/img/wn/${x.icon}.png`;
        icon.alt = x.icon;
        container.appendChild(icon);

        const temp = document.createElement("h3");
        temp.textContent = Math.round(x.weather.temp);
        container.appendChild(temp);

        const minMaxContainer = document.createElement("div");
        minMaxContainer.classList.add("min-max-container");
        container.appendChild(minMaxContainer);

        const minTemp = document.createElement("h4");
        minTemp.textContent = `min: ${Math.round(x.weather.temp_min)}`;
        minMaxContainer.appendChild(minTemp);

        const maxTemp = document.createElement("h4");
        maxTemp.textContent = `max: ${Math.round(x.weather.temp_max)}`;
        minMaxContainer.appendChild(maxTemp);
    };

    data.weatherArr.forEach((x, index) => {
        const weatherContainer = document.createElement("div");
        weatherContainer.classList.add("weather-container");
        weatherContainer.id = index;
        main.appendChild(weatherContainer);

        if (index === 0) weatherContainer.classList.add("show-weather");

        x.forEach((data) => renderHtml(data, weatherContainer));
    });

    circleContainer.classList.add("show");
    weatherContainers = Array.from(
        document.querySelectorAll(".weather-container")
    );
};

const getWeather = async (url) => {
    const processData = (data) => {
        const weatherData = {
            city: data.city.name,
            weatherArr: [],
        };

        let dayWeather = [];
        let i = 0;

        data.list.forEach((x, index) => {
            if (i === 8) {
                weatherData.weatherArr.push(dayWeather);
                dayWeather = [];
                i = 0;
            } else if (index === 39) weatherData.weatherArr.push(dayWeather);

            i++;

            dayWeather.push({
                weather: x.main,
                icon: x.weather[0].icon,
            });
        });

        console.log(weatherData);
        renderData(weatherData);
    };

    try {
        const req = new Request(url);
        const response = await fetch(req);

        if (response.status === 200) {
            const res = await response.json();

            console.log(res);
            processData(res);
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        throw new Error(err);
    }
};
