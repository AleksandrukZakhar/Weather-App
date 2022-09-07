const KEY = "dfa0fc71cd912959d3815771c5d574d1";
const input = document.querySelector("input");
const search = document.querySelector(".search");

input.addEventListener("input", () => {
    search.classList.add("show");
});

search.addEventListener("click", () => {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${KEY}`;
    input.value = "";
    search.classList.remove("show");

    getWeather(url);
});

const getWeather = async (url) => {
    const req = new Request(url);

    try {
        const response = await fetch(req);

        if (response.status === 200) {
            const res = await response.json();
            console.log(res);
        } else {
            throw new Error(response.status);
        }
    } catch (err) {
        throw new Error(err);
    }
};
