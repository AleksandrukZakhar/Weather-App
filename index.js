const KEY = "dfa0fc71cd912959d3815771c5d574d1";

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

getWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${KEY}`
);
