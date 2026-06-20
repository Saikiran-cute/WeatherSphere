const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// =========================================
// Current Weather
// =========================================

const getWeather = async (req, res) => {

  try {

    const { city, lat, lon } = req.query;

    let url = "";

    if (city) {

      url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;

    } else if (lat && lon) {

      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    } else {

      return res.status(400).json({
        success: false,
        message: "Provide city or latitude & longitude."
      });

    }

    const { data } = await axios.get(url);

    res.json({
      success: true,
      data
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch weather."
    });

  }

};

// =========================================
// Forecast
// =========================================

const getForecast = async (req, res) => {

  try {

    const { city } = req.query;

    if (!city) {

      return res.status(400).json({
        success: false,
        message: "City is required."
      });

    }

    const { data } = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json({
      success: true,
      data
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch forecast."
    });

  }

};

// =========================================
// Air Quality
// =========================================

const getAirQuality = async (req, res) => {

  try {

    const { lat, lon } = req.query;

    if (!lat || !lon) {

      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude required."
      });

    }

    const { data } = await axios.get(

      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    );

    res.json({

      success: true,

      data

    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({

      success: false,

      message: "Unable to fetch Air Quality."

    });

  }

};

module.exports = {

  getWeather,

  getForecast,

  getAirQuality

};