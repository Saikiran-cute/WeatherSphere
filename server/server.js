require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`
========================================
🌤 WeatherSphere Backend Started
🚀 Server running on Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || "development"}
========================================
`);

});