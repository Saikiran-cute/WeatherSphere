import Navbar from "../../components/Navbar/Navbar";
import SearchBox from "../../components/SearchBox/SearchBox";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import WeatherHighlights from "../../components/WeatherHighlights/WeatherHighlights";
import HourlyForecast from "../../components/HourlyForecast/HourlyForecast";
import AirQuality from "../../components/AirQuality/AirQuality";
import Forecast from "../../components/Forecast/Forecast";

import "./Home.css";

function Home() {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <Navbar />

      {/* Search */}
      <div className="search-section">
        <SearchBox />
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-grid">

        {/* Current Weather */}
        <section className="current-weather-section">
          <CurrentWeather />
        </section>

        {/* Weather Highlights */}
        <section className="highlights-section">
          <WeatherHighlights />
        </section>

      </div>

      {/* Hourly Forecast */}
      <section className="forecast-section">
        <h2 className="section-title">
          Today's Hourly Forecast
        </h2>

        <HourlyForecast />
      </section>

      {/* Air Quality */}
      <section className="forecast-section">
        <AirQuality />
      </section>

      {/* 5-Day Forecast */}
      <section className="forecast-section">
        <h2 className="section-title">
          5-Day Forecast
        </h2>

        <Forecast />
      </section>

    </div>
  );
}

export default Home;