"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-500 mb-8">Where would you like to go?</p>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/LogIn")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition cursor-pointer"
          >
            🔐 Login
          </button>

          <button
            onClick={() => router.push("/Product")}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition cursor-pointer"
          >
            📦 View Products
          </button>
        </div>
      </div>
    </div>
  );
}
