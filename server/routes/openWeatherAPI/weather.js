require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/weather', async (req, res) => {
    try {
        const { destination } = req.body;

        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

        const response = await axios.get(openWeatherUrl);
        const weatherData = response.data;

        const temperature = Math.round(weatherData.main.temp) + "°c";
        const humidity = weatherData.main.humidity + "%";
        const wind = weatherData.wind.speed + " km/h";
        const icon = weatherData.weather[0].icon;

        res.status(200).json({ temperature, humidity, wind, icon });
    } catch (error) {
        console.error('Erro ao obter os dados de clima:', error);
        res.status(500).json({ error: 'Erro ao obter os dados de clima' });
    }
});

module.exports = router;
