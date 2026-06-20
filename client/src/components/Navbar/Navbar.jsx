import "./Navbar.css";
import { FaCloudSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

function Navbar() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const currentDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (

    <nav className="navbar">

      <div className="logo">

        <FaCloudSun className="logo-icon" />

        <div>

          <h2>WeatherSphere</h2>

          <span className="tagline">
            Live Weather Intelligence
          </span>

        </div>

      </div>

      <div className="navbar-right">

        <div className="date-time">

          <h4>{currentDate}</h4>

          <p>{currentTime}</p>

        </div>

        <button className="theme-btn">

          <FaMoon />

        </button>

      </div>

    </nav>

  );
}

export default Navbar;