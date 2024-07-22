require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const clothesRoutes = require('./routes/geminiAPI/clothes')
const weatherRoutes = require('./routes/openWeatherAPI/weather')

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(clothesRoutes)
app.use(weatherRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

