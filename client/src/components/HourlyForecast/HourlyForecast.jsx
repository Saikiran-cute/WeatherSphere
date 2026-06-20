import "./HourlyForecast.css";
import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

function HourlyForecast() {

  const { hourlyForecast } = useContext(WeatherContext);

  const getIcon = (condition) => {

    switch (condition) {

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

  return (

    <div className="hourly-wrapper">

      <h2>Hourly Forecast</h2>

      <div className="hourly-scroll">

        {hourlyForecast.map((item) => (

          <div
            className="hour-card"
            key={item.dt}
          >

            <p>
              {new Date(item.dt_txt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <div className="hour-icon">
              {getIcon(item.weather[0].main)}
            </div>

            <h3>
              {Math.round(item.main.temp)}°
            </h3>

            <span>
              {item.weather[0].main}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default HourlyForecast;