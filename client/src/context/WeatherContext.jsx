import { createContext, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

// ✅ Render Backend URL
const BASE_URL = "https://weathersphere-o3h4.onrender.com/api/weather";

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Weather
  const fetchWeather = async (city = "Hyderabad") => {
    try {
      setLoading(true);
      setError("");

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}?city=${city}`),
        axios.get(`${BASE_URL}/forecast?city=${city}`),
      ]);

      if (weatherRes.data.success) {
        const weatherData = weatherRes.data.data;
        setWeather(weatherData);

        const { lat, lon } = weatherData.coord;

        const aqiRes = await axios.get(
          `${BASE_URL}/air-quality?lat=${lat}&lon=${lon}`
        );

        if (aqiRes.data.success) {
          setAirQuality(aqiRes.data.data);
        }
      }

      if (forecastRes.data.success) {
        const list = forecastRes.data.data.list;

        setHourlyForecast(list.slice(0, 8));

        const daily = list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(daily);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  // Current Location
  const fetchCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);

          const { latitude, longitude } = position.coords;

          const weatherRes = await axios.get(
            `${BASE_URL}?lat=${latitude}&lon=${longitude}`
          );

          if (weatherRes.data.success) {
            const weatherData = weatherRes.data.data;
            setWeather(weatherData);

            const forecastRes = await axios.get(
              `${BASE_URL}/forecast?city=${weatherData.name}`
            );

            const list = forecastRes.data.data.list;

            setHourlyForecast(list.slice(0, 8));

            const daily = list.filter((item) =>
              item.dt_txt.includes("12:00:00")
            );

            setForecast(daily);

            const aqiRes = await axios.get(
              `${BASE_URL}/air-quality?lat=${latitude}&lon=${longitude}`
            );

            if (aqiRes.data.success) {
              setAirQuality(aqiRes.data.data);
            }
          }
        } catch (err) {
          console.error(err);
          setError("Unable to fetch location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
      }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        hourlyForecast,
        airQuality,
        loading,
        error,
        fetchWeather,
        fetchCurrentLocationWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;