import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await API.post("/api/auth/reset-password", {
      token,
      password,
    });
    setMsg(data.msg);
  } catch (err) {
    setMsg(err.response?.data?.msg || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">

      <div className="bg-white/10 backdrop-blur-md border border-white/20 
      rounded-2xl p-8 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
            text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 
            py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Reset Password
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-green-400 text-center">{msg}</p>
        )}
      </div>
    </div>
  );
}