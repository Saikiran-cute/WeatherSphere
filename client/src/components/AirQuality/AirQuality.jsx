import "./AirQuality.css";
import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { FaWind } from "react-icons/fa";

function AirQuality() {

  const { airQuality } = useContext(WeatherContext);

  if (!airQuality) {
    return null;
  }

  const aqi = airQuality.list[0];

  const level = [
    "",
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor",
  ];

  const colors = [
    "",
    "#22c55e",
    "#84cc16",
    "#facc15",
    "#f97316",
    "#ef4444",
  ];

  return (

    <div className="aqi-card">

      <div className="aqi-header">

        <FaWind className="aqi-icon"/>

        <h2>Air Quality</h2>

      </div>

      <div
        className="aqi-circle"
        style={{
          borderColor: colors[aqi.main.aqi]
        }}
      >
        {aqi.main.aqi}
      </div>

      <h3
        style={{
          color: colors[aqi.main.aqi]
        }}
      >
        {level[aqi.main.aqi]}
      </h3>

      <div className="aqi-details">

        <div>
          <span>PM2.5</span>
          <strong>{aqi.components.pm2_5.toFixed(1)}</strong>
        </div>

        <div>
          <span>PM10</span>
          <strong>{aqi.components.pm10.toFixed(1)}</strong>
        </div>

        <div>
          <span>CO</span>
          <strong>{aqi.components.co.toFixed(0)}</strong>
        </div>

        <div>
          <span>NO₂</span>
          <strong>{aqi.components.no2.toFixed(0)}</strong>
        </div>

      </div>

    </div>

  );

}

export default AirQuality;