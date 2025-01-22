"use client";

import NavbarAdmin from "@/app/components/NavbarAdmin";
import { useEffect, useState } from "react";

export default function VideoAdmin() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            window.location.href = "/auth/login";
        }

        setLoading(false);
    }, []); // Dependency array kosong untuk memastikan efek ini hanya dijalankan sekali.

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
                        <div className="p-4 bg-white rounded-lg shadow-lg flex items-center">
                            <p className="text-lg font-semibold text-pink-500">Video</p>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
