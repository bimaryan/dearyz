"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-800">
                    Dearyz
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="text-pink-600 hover:text-pink-800 font-medium">
                        Home
                    </Link>
                    <Link href="/p/photo" className="text-pink-600 hover:text-pink-800 font-medium">
                        Photo
                    </Link>
                    {/* <Link href="/p/video" className="text-pink-600 hover:text-pink-800 font-medium">
                        Video
                    </Link> */}
                </div>

                {/* User Section */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/auth/login" className="text-sm text-pink-600 bg-pink-200 hover:bg-pink-600 hover:text-white px-4 py-2 rounded-xl font-bold">
                        Login
                    </Link>
                </div>

                {/* Mobile Menu */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
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
                        ></path>
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="space-y-2 px-4 py-3">
                        <Link href="/" className="block text-gray-700 hover:text-gray-900 font-medium">
                            Home
                        </Link>
                        <Link href="/p/photo" className="block text-gray-700 hover:text-gray-900 font-medium">
                            Photo
                        </Link>
                        {/* <Link href="/p/video" className="block text-gray-700 hover:text-gray-900 font-medium">
                            Video
                        </Link> */}
                        <hr className="my-2" />
                        <Link href="/auth/login" className="block text-gray-700 hover:text-gray-900 font-medium">
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
