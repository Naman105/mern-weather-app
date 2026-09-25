import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";
import { MdVisibility } from "react-icons/md";

const bgMap = {
  Clear: "from-yellow-400/80 to-orange-500/80",
  Clouds: "from-gray-400/80 to-gray-700/80",
  Rain: "from-blue-500/80 to-blue-900/80",
  Drizzle: "from-blue-300/80 to-blue-600/80",
  Thunderstorm: "from-gray-700/80 to-black",
  Snow: "from-blue-100/80 to-blue-300/80",
  Mist: "from-gray-300/80 to-gray-500/80",
  Haze: "from-yellow-200/80 to-gray-400/80",
};

export default function WeatherCard({ data }) {
  const bg = bgMap[data.main] || "from-blue-500 to-blue-800";

  return (
    <div className="relative max-w-md mx-auto">

      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg} blur-2xl opacity-40 rounded-3xl`} />

      {/* Main Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 
rounded-3xl shadow-2xl p-8 text-white max-w-md mx-auto 
relative z-10">

        {/* City */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold tracking-wide">
            {data.city}, {data.country}
          </h2>
          <p className="capitalize text-sm opacity-80 mt-1">
            {data.description}
          </p>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            className="w-20 h-20 drop-shadow-lg"
          />
          <div>
            <p className="text-6xl font-light leading-none">
              {data.temp}°
            </p>
            <p className="text-xs opacity-70 mt-1">
              Feels like {data.feels_like}°C
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-6" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Stat icon={<WiHumidity size={26} />} label="Humidity" value={`${data.humidity}%`} />
          <Stat icon={<WiStrongWind size={26} />} label="Wind" value={`${data.wind_speed} m/s`} />
          <Stat icon={<WiBarometer size={26} />} label="Pressure" value={`${data.pressure} hPa`} />
          <Stat icon={<MdVisibility size={22} />} label="Visibility" value={`${data.visibility} km`} />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div
      className="bg-white/10 border border-white/20 backdrop-blur-md 
      rounded-xl p-4 flex items-center gap-3 transition hover:bg-white/20"
    >
      <span className="opacity-80">{icon}</span>
      <div>
        <p className="text-xs opacity-60">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}