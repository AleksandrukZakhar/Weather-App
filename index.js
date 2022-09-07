const KEY = "dfa0fc71cd912959d3815771c5d574d1";
const input = document.querySelector("input");
const search = document.querySelector(".search");

input.addEventListener("input", () => {
    search.classList.add("show");
});

search.addEventListener("click", () => {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${KEY}`;
    input.value = "";
    search.classList.remove("show");

    getWeather(url);
});

const getWeather = async (url) => {
    const processData = (data) => {
        const weatherData = {
            city: data.city.name,
            weatherArr: [],
            icon: "",
        };

        data.list.forEach((item) => {
            weatherData.weatherArr.push({
                weather: item.main,
                icon: item.weather[0].icon,
            });
        });

        console.log(weatherData);
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
