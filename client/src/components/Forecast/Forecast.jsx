import "./Forecast.css";
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

function Forecast() {

  const { forecast, loading } = useContext(WeatherContext);

  if (loading) {
    return <h2 className="forecast-loading">Loading Forecast...</h2>;
  }

  if (!forecast.length) {
    return <h2 className="forecast-loading">No Forecast Available</h2>;
  }

  const getWeatherIcon = (main) => {
    switch (main) {
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
    <div className="forecast-grid">
      {forecast.map((item) => {

        const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <div className="forecast-card" key={item.dt}>

            <h3>{day}</h3>

            <div className="forecast-icon">
              {getWeatherIcon(item.weather[0].main)}
            </div>

            <h2>{Math.round(item.main.temp)}°C</h2>

            <p>{item.weather[0].main}</p>

          </div>
        );
      })}
    </div>
  );
}

export default Forecast;