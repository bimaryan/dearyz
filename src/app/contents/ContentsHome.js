"use client";

import { useState } from "react";

export default function ContentsHome() {
    const images = [
        "https://flowbite.com/docs/images/carousel/carousel-1.svg",
        "https://flowbite.com/docs/images/carousel/carousel-2.svg",
        "https://flowbite.com/docs/images/carousel/carousel-3.svg",
        "https://flowbite.com/docs/images/carousel/carousel-4.svg",
        "https://flowbite.com/docs/images/carousel/carousel-5.svg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div id="carousel-photo" className="relative w-full">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                                }`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                {/* Previous Button */}
                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/70">
                        <svg
                            className="w-4 h-4 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/70">
                        <svg
                            className="w-4 h-4 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
