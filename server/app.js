const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WeatherSphere Backend Running Successfully 🚀"
  });
});

module.exports = app;