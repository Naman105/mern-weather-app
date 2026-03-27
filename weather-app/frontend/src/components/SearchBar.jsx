import { FaSearch } from "react-icons/fa";

export default function SearchBar({ city, setCity, handleSearch, loading }) {
  return (
    <form
      onSubmit={handleSearch}
      className="max-w-2xl mx-auto mb-12"
    >
      <div className="flex items-center bg-white/10 border border-white/20 
      rounded-2xl overflow-hidden backdrop-blur-md shadow-lg">

        {/* Input */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city (e.g. Mumbai)"
          className="flex-1 px-5 py-4 bg-transparent text-white 
          placeholder-gray-400 focus:outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 
          px-6 py-4 flex items-center gap-2 font-semibold 
          hover:scale-105 transition"
        >
          <FaSearch />
          {loading ? "..." : "Search"}
        </button>
      </div>
    </form>
  );
}