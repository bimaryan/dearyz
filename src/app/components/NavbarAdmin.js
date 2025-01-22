"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function NavbarAdmin() {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [data, setData] = useState({ user: null });

    const [activeLink, setActiveLink] = useState("");

    const handleLogout = async () => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You will be logged out!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, logout!",
                cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
                try {
                    const response = await fetch("https://bimaryan.serv00.net/api/logout", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        localStorage.removeItem("auth_token");
                        window.location.href = "/auth/login";
                    } else {
                        console.error("Logout failed");
                    }
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            }
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("auth_token");

            if (token) {
                try {
                    const response = await fetch("https://bimaryan.serv00.net/api/dashboard", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setData(data);
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUser();

        setActiveLink(window.location.pathname);
    }, []);

    const isActive = (path) => activeLink === path ? "bg-pink-600" : "bg-pink-500";

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed w-full z-50">
                <div className="flex justify-between items-center px-4 py-3 lg:px-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                            className="text-gray-700 hover:text-gray-900 focus:outline-none lg:hidden"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                        <Link href="/" className="text-2xl font-bold text-pink-600 ml-4 hover:text-pink-800">
                            Dearyz
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setIsOpenProfile(!isOpenProfile)}
                            className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-pink-300"
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="user"
                            />
                        </button>
                        {isOpenProfile && (
                            <div className="absolute top-14 right-4 bg-white border rounded shadow-md w-48">
                                <div className="p-3">
                                    {data ? (
                                        <>
                                            <p className="text-sm font-bold text-gray-800">{data.user.name}</p>
                                            <p className="text-sm text-gray-600">{data.user.email}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-600">Loading...</p>
                                    )}
                                </div>
                                <div className="border-t">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-pink-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-[50px] bg-pink-400 transform ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"
                    } transition-transform lg:translate-x-0`}
            >
                <div className="h-full px-4 py-6">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className={`flex items-center p-3 text-white rounded-lg ${isActive('/admin/dashboard')} hover:bg-pink-600`}
                            >
                                <i className="fa-solid fa-gauge"></i>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/photo"
                                className={`flex items-center p-3 text-white rounded-lg ${isActive('/admin/photo')} hover:bg-pink-600`}
                            >
                                <i className="fa-solid fa-image"></i>
                                <span className="ms-3">Photo</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                href="/admin/video"
                                className={`flex items-center p-3 text-white rounded-lg ${isActive('/admin/video')} hover:bg-pink-600`}
                            >
                                <i className="fa-solid fa-video"></i>
                                <span className="ms-3">Video</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </>
    );
}