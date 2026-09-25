const axios = require("axios");
const User = require("../models/User");

// @route GET /api/weather/:city
exports.getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    const weather = {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      visibility: data.visibility / 1000,
      pressure: data.main.pressure,
    };

    // Save to user's search history if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          searchHistory: {
            $each: [{ city: data.name }],
            $slice: -10, // Keep last 10 searches
          },
        },
      });
    }

    res.json(weather);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// @route GET /api/weather/history
exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("searchHistory");
    res.json(user.searchHistory.reverse());
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route DELETE /api/weather/history
exports.clearHistory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { searchHistory: [] });
    res.json({ message: "History cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
