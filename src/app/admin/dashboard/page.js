"use client";

import NavbarAdmin from "@/app/components/NavbarAdmin";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState({ photo: 0, video: 0, user: null });

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            setIsAuthenticated(true);

            // Fetch data from API
            fetch("https://bimaryan.serv00.net/api/dashboard", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return response.json();
                })
                .then((result) => {
                    setData(result);
                })
                .catch((error) => {
                    Swal.fire("Error", error.message, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            window.location.href = "/auth/login";
        }
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100">
            <div className="w-16 h-16 border-t-4 border-pink-600 border-solid rounded-full animate-spin"></div>
        </div>
    );

    return (
        isAuthenticated && (
            <>
                <NavbarAdmin />
                <div className="p-4 sm:ml-64">
                    <div className="space-y-4 rounded-lg mt-14">
                        <div className="space-y-4 rounded-lg mt-14">
                            <div className="p-4 bg-white rounded-lg shadow-lg flex items-center">
                                <p className="text-lg font-semibold text-pink-500">Dashboard</p>
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div>
                                    <div className="p-4 bg-white rounded-lg shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-lg text-pink-500 font-semibold">Photo</p>
                                                <p className="text-xl text-gray-800 font-semibold">{data.photo}</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-semibold text-pink-500">
                                                    <i className="fa-solid fa-image"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-4 bg-white rounded-lg shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-lg text-pink-500 font-semibold">Video</p>
                                                <p className="text-xl text-gray-800 font-semibold">{data.video}</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-semibold text-pink-500">
                                                    <i className="fa-solid fa-video"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
