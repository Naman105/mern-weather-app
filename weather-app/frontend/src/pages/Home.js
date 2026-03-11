import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaHistory, FaTrash } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";

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
      const { data } = await axios.get("/api/weather/user/history");
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
      const { data } = await axios.get(`/api/weather/${city.trim()}`);
      setWeather(data);
      if (user) fetchHistory();
    } catch (err) {
      setError(err.response?.data?.message || "City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete("/api/weather/user/history");
      setHistory([]);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <WiDaySunny size={64} className="text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-3">
            Weather <span className="text-blue-400">Finder</span>
          </h1>
          <p className="text-gray-400">
            {user
              ? `Welcome back, ${user.name}! Search for any city.`
              : "Search any city for real-time weather. Login to save your history."}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mx-auto mb-12">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name... (e.g. Mumbai)"
            className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 
                       text-white placeholder-gray-400 focus:outline-none focus:border-blue-400
                       backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 px-6 py-4 
                       rounded-xl font-semibold flex items-center gap-2 transition"
          >
            <FaSearch />
            {loading ? "..." : "Search"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="text-center text-red-400 bg-red-900/30 border border-red-700 
                          rounded-xl p-4 max-w-xl mx-auto mb-8">
            {error}
          </div>
        )}

        {/* Weather Result */}
        {weather && (
          <div className="mb-12 animate-fade-in">
            <WeatherCard data={weather} />
          </div>
        )}

        {/* Search History */}
        {user && history.length > 0 && (
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-300">
                <FaHistory /> Recent Searches
              </h3>
              <button
                onClick={clearHistory}
                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition"
              >
                <FaTrash size={12} /> Clear
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCity(h.city);
                    handleSearch({ preventDefault: () => {}, target: {} });
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-blue-500/30 border border-white/20 
                             rounded-full text-sm transition"
                >
                  {h.city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
