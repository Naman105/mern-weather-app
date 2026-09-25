import { useState, useEffect } from "react";
import API from "../api";
import WeatherCard from "../components/WeatherCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get("/api/weather/user/history");
      setHistory(data);
    } catch {}
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const { data } = await API.get(`/api/weather/${city.trim()}`);
      setWeather(data);
      if (user) fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || "City not found");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await API.delete("/api/weather/user/history");
      setHistory([]);
    } catch {}
  };

  return (
  <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-white">

    {/* Glow background */}
    <div className="absolute inset-0 bg-blue-500/10 blur-3xl opacity-30 pointer-events-none"></div>

    {/* Content */}
    <div className="relative max-w-5xl mx-auto px-6 pt-6 pb-10">

        {/* Header */}
        <Header user={user} />

        {/* Search */}
        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          loading={loading}
        />

        {/* Error */}
        {error && (
          <div className="text-center text-red-400 bg-red-900/30 border border-red-700 
                          rounded-lg p-4 max-w-xl mx-auto mb-8">
            {error}
          </div>
        )}

        {/* Weather */}
       {weather && (
  <div className="relative max-w-md mx-auto mt-10">

    {/* STRONG GLOW */}
    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 rounded-3xl"></div>

    <WeatherCard data={weather} />
  </div>
)}

        {/* History */}
        {user && history.length > 0 && (
          <SearchHistory
            history={history}
            clearHistory={clearHistory}
            setCity={setCity}
            handleSearch={handleSearch}
          />
        )}
      </div>
    </div>
  );
}