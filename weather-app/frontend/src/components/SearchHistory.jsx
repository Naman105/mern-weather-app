import { FaHistory, FaTrash } from "react-icons/fa";

export default function SearchHistory({ history, clearHistory, setCity, handleSearch }) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="flex items-center gap-2 text-gray-300">
          <FaHistory /> Recent Searches
        </h3>

        <button onClick={clearHistory} className="text-red-400">
          <FaTrash size={12} /> Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((h, i) => (
          <button
            key={i}
            onClick={() => {
              setCity(h.city);
              handleSearch({ preventDefault: () => {} });
            }}
            className="px-4 py-2 bg-gray-800 rounded-full"
          >
            {h.city}
          </button>
        ))}
      </div>
    </div>
  );
}