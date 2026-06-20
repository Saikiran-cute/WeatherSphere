const express = require("express");
const router = express.Router();

const {
  getWeather,
  getForecast,
  getAirQuality
} = require("../controllers/weatherController");

// Current Weather
router.get("/", getWeather);

// 5-Day Forecast
router.get("/forecast", getForecast);

// Air Quality
router.get("/air-quality", getAirQuality);

module.exports = router;