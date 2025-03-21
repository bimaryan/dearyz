"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Photo() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const previousPage =
    urlParams.get("page") || localStorage.getItem("lastPhotoPage") || 1;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://bimaryan.serv00.net/api/allphoto?page=${currentPage}`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setPhotos(response.data.photos);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError("Error fetching photos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      <Navbar />
      <br />
      <br />

      <main className="w-full flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-2 mb-5 shadow-lg">
            <h1 className="text-2xl text-pink-500 font-bold text-center">
              All Photo
            </h1>
          </div>

          {loading && (
            <div className="flex justify-center my-8">
              <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && photos.length === 0 ? (
            <div className="flex items-center justify-center h-[70vh]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/10519/10519654.png"
                alt="No photos available"
                className="w-48 h-48 object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <Link
                  href={`/p/photo/detail?nama=${photo.nama}&page=${currentPage}`}
                  key={photo.id}
                  className="relative overflow-hidden rounded-lg shadow-lg bg-white"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.nama || `Photo ${photo.id}`}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        {photo.nama || "Untitled"}
                      </h3>
                      <p className="text-gray-100 font-semibold text-sm">
                        {format(new Date(photo.created_at), "d MMMM yyyy", {
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && photos.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className="mx-4 self-center text-pink-500 text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full bg-white text-center py-4">
        <p className="text-gray-600 text-sm">Made with ❤️ just for you.</p>
      </footer>
    </div>
  );
}
