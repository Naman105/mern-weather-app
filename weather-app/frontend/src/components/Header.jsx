import { WiDaySunny } from "react-icons/wi";
import { motion } from "framer-motion";

export default function Header({ user }) {
  return (
    <div className="text-center mb-12">
      <WiDaySunny size={64} className="text-yellow-400 mx-auto mb-4" />
      <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Weather <span className="text-blue-400">Finder</span>
      </h1>
      <p className="text-gray-400">
        {user
          ? `Welcome back, ${user.name}!`
          : "Search any city for real-time weather"}
      </p>
    </div>
  );
}