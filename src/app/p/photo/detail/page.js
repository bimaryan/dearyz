"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Detail() {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const allphoto = urlParams.get("nama");

    if (!allphoto) {
      setError("Photo name not provided.");
      return;
    }

    const fetchPhotoDetail = async () => {
      try {
        const response = await axios.get(
          `https://bimaryan.serv00.net/api/allphoto/${allphoto}`
        );
        setPhoto(response.data.photo);
      } catch (err) {
        setError("Failed to fetch photo detail. Please try again.");
      }
    };

    fetchPhotoDetail();
  }, []);

  const handleShareLink = () => {
    const currentUrl = `${window.location.origin}/p/photo/detail?nama=${photo.nama}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link copied to clipboard!",
        });
      })
      .catch(() => {
        alert("Failed to copy the link. Please try again.");
      });
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!photo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      <main className="w-full flex-grow">
        <div className="max-w-screen-lg mx-auto p-4 pt-20">
          <Link
            href="/p/photo"
            className="bg-pink-500 hover:bg-pink-700 px-3 py-2 rounded-lg"
          >
            <i className="fa-solid fa-arrow-left"></i>{" "}
            <span className="ml-1">Back</span>
          </Link>
          <br />

          {/* Container for layout */}
          <div className="flex mt-4 md:flex-row flex-col justify-between bg-white shadow-md rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="bg-black flex justify-center items-center relative">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
              )}
              <img
                src={photo.image_url}
                alt={photo.nama}
                className={`object-cover w-full h-full  transition-opacity duration-500 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col w-full">
              <div className="p-4 border-b border-pink-100 flex justify-between">
                <h1 className="text-pink-500 font-semibold text-xl">
                  {photo.nama}
                </h1>
                <button
                  onClick={handleShareLink}
                  className="text-gray-500 hover:text-pink-500 transition"
                >
                  <i className="fa-solid fa-share-nodes text-2xl"></i>
                </button>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-gray-500">
                  {photo.deskripsi ?? "Tidak ada deskripsi..."}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(photo.created_at), "d MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white text-center py-4 mt-6">
        <p className="text-gray-600 text-sm">Made with ❤️ just for you.</p>
      </footer>
    </div>
  );
}
