import "./Loading.css";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";

function Loading() {
  return (
    <div className="loading-screen">

      <motion.div
        className="loading-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        <motion.div
          className="loading-icon"
          animate={{
            rotate: 360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
            },
          }}
        >
          <WiDaySunny />
        </motion.div>

        <h1>WeatherSphere</h1>

        <p>Fetching latest weather data...</p>

        <motion.div
          className="loader"
          animate={{
            x: [-40, 40, -40],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </motion.div>

    </div>
  );
}

export default Loading;