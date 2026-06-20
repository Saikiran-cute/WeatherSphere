import "./WeatherHighlights.css";
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import { WeatherContext } from "../../context/WeatherContext";

function WeatherHighlights() {
  const { weather, loading } = useContext(WeatherContext);

  if (loading) {
    return (
      <div className="highlights-grid">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="highlights-grid">
        <h2>No Weather Data</h2>
      </div>
    );
  }

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const data = [
    {
      icon: <WiStrongWind />,
      title: "Wind",
      value: `${weather.wind.speed} km/h`,
    },
    {
      icon: <WiHumidity />,
      title: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      icon: <WiBarometer />,
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: <FaEye />,
      title: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: <WiSunrise />,
      title: "Sunrise",
      value: sunrise,
    },
    {
      icon: <WiSunset />,
      title: "Sunset",
      value: sunset,
    },
  ];

  return (
    <motion.div
      className="highlights-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >
      {data.map((item, index) => (
        <motion.div
          className="highlight-card"
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            duration: 0.5,
          }}
          whileHover={{
            y: -8,
            scale: 1.04,
          }}
        >
          <motion.div
            className="icon"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            {item.icon}
          </motion.div>

          <h4>{item.title}</h4>

          <h2>{item.value}</h2>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default WeatherHighlights;