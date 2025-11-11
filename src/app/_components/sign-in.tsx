"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/auth-store";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useAuthStore((state) => state.signIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = signIn(username, password);
    if (!success) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-0"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-0"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-0 transition-colors uppercase tracking-wider"
          >
            enter
          </button>
        </form>
      </div>
    </div>
  );
}