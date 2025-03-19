"use client";

import { useState, useEffect } from "react";

export default function QuotesCarousel() {
  const quotes = [
    "Cinta sejati adalah ketika kamu tidak bisa membayangkan hidup tanpanya.",
    "Setiap hari bersamamu adalah halaman baru dalam kisah cinta kita.",
    "Kamu adalah jawaban dari setiap doa yang aku panjatkan.",
    "Aku mencintaimu tidak hanya karena siapa kamu, tetapi karena siapa aku saat bersamamu.",
    "Cinta bukan tentang seberapa lama kita bersama, tapi seberapa dalam kita saling memahami.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Ganti setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-6 text-center">
      <div className="relative p-6 bg-white shadow-lg rounded-lg">
        <p className="text-xl font-semibold italic text-gray-700">
          "{quotes[currentIndex]}"
        </p>
      </div>
      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
            aria-label={`Quote ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
