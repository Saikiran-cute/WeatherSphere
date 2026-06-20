import "./CurrentWeather.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import { WeatherContext } from "../../context/WeatherContext";
import Loading from "../Loading/Loading";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

function CurrentWeather() {
  const { weather, loading } = useContext(WeatherContext);

  // Premium Loading Screen
  if (loading) {
    return <Loading />;
  }

  if (!weather) {
    return (
      <div className="current-weather">
        <h2>No Weather Data Found</h2>
      </div>
    );
  }

  const getWeatherIcon = () => {
    switch (weather.weather[0].main) {
      case "Clear":
        return <WiDaySunny />;
      case "Clouds":
        return <WiCloud />;
      case "Rain":
      case "Drizzle":
        return <WiRain />;
      case "Thunderstorm":
        return <WiThunderstorm />;
      case "Snow":
        return <WiSnow />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog />;
      default:
        return <WiCloud />;
    }
  };

  const updatedTime = new Date(weather.dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      className="current-weather"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="weather-icon"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        {getWeatherIcon()}
      </motion.div>

      <motion.h1
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Math.round(weather.main.temp)}°C
      </motion.h1>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {weather.name}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FaMapMarkerAlt />
        {weather.sys.country}
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ textTransform: "capitalize" }}
      >
        {weather.weather[0].description}
      </motion.span>

      <motion.div
        className="feels-like"
        whileHover={{ scale: 1.05 }}
      >
        Feels Like {Math.round(weather.main.feels_like)}°C
      </motion.div>

      <div className="weather-extra">
        <motion.div
          className="extra-box"
          whileHover={{ scale: 1.05 }}
        >
          <small>High</small>
          <strong>{Math.round(weather.main.temp_max)}°</strong>
        </motion.div>

        <motion.div
          className="extra-box"
          whileHover={{ scale: 1.05 }}
        >
          <small>Low</small>
          <strong>{Math.round(weather.main.temp_min)}°</strong>
        </motion.div>
      </div>

      <motion.div
        className="updated-time"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Updated: {updatedTime}
      </motion.div>
    </motion.div>
  );
}

export default CurrentWeather;