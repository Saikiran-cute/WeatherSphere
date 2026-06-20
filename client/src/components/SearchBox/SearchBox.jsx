import "./SearchBox.css";
import { FaSearch, FaLocationArrow, FaHistory } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";

function SearchBox() {

  const {
    fetchWeather,
    fetchCurrentLocationWeather,
    loading,
  } = useContext(WeatherContext);

  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  useEffect(() => {

    fetchWeather("Hyderabad");

    const stored =
      JSON.parse(localStorage.getItem("recentCities")) || [];

    setRecentCities(stored);

  }, []);

  const saveRecentCity = (cityName) => {

    let updated = [
      cityName,
      ...recentCities.filter(
        (item) =>
          item.toLowerCase() !== cityName.toLowerCase()
      ),
    ];

    updated = updated.slice(0, 5);

    setRecentCities(updated);

    localStorage.setItem(
      "recentCities",
      JSON.stringify(updated)
    );

  };

  const handleSearch = () => {

    if (!city.trim()) return;

    fetchWeather(city.trim());

    saveRecentCity(city.trim());

    setCity("");

  };

  return (

    <>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search any city..."
          value={city}
          disabled={loading}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "..." : <FaSearch />}
        </button>

        <button
          className="location-btn"
          onClick={fetchCurrentLocationWeather}
          disabled={loading}
        >
          <FaLocationArrow />
          {loading ? " Loading..." : " Current Location"}
        </button>

      </div>

      {recentCities.length > 0 && (

        <div className="recent-searches">

          <h4>

            <FaHistory />

            Recent Searches

          </h4>

          <div className="recent-list">

            {recentCities.map((item, index) => (

              <button
                key={index}
                onClick={() => fetchWeather(item)}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      )}

    </>

  );
}

export default SearchBox;