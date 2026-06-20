import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import Home from "./pages/Home/Home";
import { WeatherContext } from "./context/WeatherContext";

function App() {
  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    if (!weather) return;

    const condition = weather.weather[0].main;
    const hour = new Date().getHours();

    document.body.classList.remove(
      "clear",
      "clouds",
      "rain",
      "snow",
      "storm",
      "night"
    );

    if (hour >= 18 || hour <= 5) {
      document.body.classList.add("night");
      return;
    }

    switch (condition) {
      case "Clear":
        document.body.classList.add("clear");
        break;

      case "Clouds":
        document.body.classList.add("clouds");
        break;

      case "Rain":
      case "Drizzle":
        document.body.classList.add("rain");
        break;

      case "Thunderstorm":
        document.body.classList.add("storm");
        break;

      case "Snow":
        document.body.classList.add("snow");
        break;

      default:
        document.body.classList.add("clear");
    }
  }, [weather]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <Home />
    </motion.div>
  );
}

export default App;