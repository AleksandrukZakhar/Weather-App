const KEY = "dfa0fc71cd912959d3815771c5d574d1";

const getWeather = async (url) => {
    try {
        const response = await fetch(url);

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
