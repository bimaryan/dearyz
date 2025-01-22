"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://bimaryan.serv00.net/api/login", {
                name: name,
                password: password,
            });

            localStorage.setItem("auth_token", response.data.token);

            window.location.href = "/admin/dashboard";

        } catch (error) {
            setError(error.response?.data?.error || "Terjadi kesalahan. Coba lagi.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100 p-6">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-xl transform hover:scale-105 transition duration-300">
                <h2 className="text-3xl font-bold text-center text-pink-600 mb-4 animate-bounce">
                    Welcome Back to Dearyz!
                </h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 mt-1 text-gray-700 border rounded-full shadow-md focus:ring-pink-500 focus:border-pink-500"
                            placeholder="username"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-1 text-gray-700 border rounded-full shadow-md focus:ring-pink-500 focus:border-pink-500"
                            placeholder="********"
                        />
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300"
                        >
                            Log In 🦄
                        </button>
                    </div>
                </form>

                {/* Error message */}
                {error && (
                    <div className="text-red-500 text-sm text-center mt-4">
                        {error}
                    </div>
                )}

                {/* Forgot Password Link */}
                {/* <div className="text-center">
                    <a href="#" className="text-sm text-pink-500 hover:underline">
                        Forgot your password? No worries! 💌
                    </a>
                </div> */}

                {/* Signup Link */}
                {/* <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="#" className="text-pink-500 hover:underline">
                            Sign up here! 🌸
                        </a>
                    </p>
                </div> */}
            </div>
        </div>
    );
}
