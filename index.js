const KEY = "dfa0fc71cd912959d3815771c5d574d1";
const input = document.querySelector("input");
const search = document.querySelector(".search");
const weatherContainer = document.querySelector(".weather-container");

input.addEventListener("input", () => {
    search.classList.add("show");
});

search.addEventListener("click", () => {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${KEY}&units=metric`;
    input.value = "";
    search.classList.remove("show");

    getWeather(url);
});

const renderData = (data) => {
    data.weatherArr.forEach((x) => {
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
    });
};

const getWeather = async (url) => {
    const processData = (data) => {
        const weatherData = {
            city: data.city.name,
            weatherArr: [],
        };

        data.list.forEach((x) => {
            weatherData.weatherArr.push({
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

            processData(res);
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        throw new Error(err);
    }
};
