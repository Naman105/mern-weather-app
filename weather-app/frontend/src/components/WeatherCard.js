import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from "react-icons/wi";
import { MdVisibility } from "react-icons/md";

const bgMap = {
  Clear: "from-yellow-400 to-orange-400",
  Clouds: "from-gray-400 to-gray-600",
  Rain: "from-blue-500 to-blue-800",
  Drizzle: "from-blue-300 to-blue-500",
  Thunderstorm: "from-gray-700 to-gray-900",
  Snow: "from-blue-100 to-blue-300",
  Mist: "from-gray-300 to-gray-500",
  Haze: "from-yellow-200 to-gray-400",
};

export default function WeatherCard({ data }) {
  const bg = bgMap[data.main] || "from-blue-500 to-blue-700";

  return (
    <div
      className={`bg-gradient-to-br ${bg} rounded-3xl shadow-2xl p-8 text-white max-w-md mx-auto`}
    >
      {/* City & Country */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">
          {data.city}, {data.country}
        </h2>
        <p className="capitalize text-lg opacity-90 mt-1">{data.description}</p>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-20 h-20"
        />
        <div>
          <p className="text-7xl font-thin">{data.temp}°</p>
          <p className="text-sm opacity-75">Feels like {data.feels_like}°C</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Stat
          icon={<WiHumidity size={28} />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <Stat
          icon={<WiStrongWind size={28} />}
          label="Wind"
          value={`${data.wind_speed} m/s`}
        />
        <Stat
          icon={<WiBarometer size={28} />}
          label="Pressure"
          value={`${data.pressure} hPa`}
        />
        <Stat
          icon={<MdVisibility size={24} />}
          label="Visibility"
          value={`${data.visibility} km`}
        />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-3">
      <span className="opacity-80">{icon}</span>
      <div>
        <p className="text-xs opacity-70">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
