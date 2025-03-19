"use client";

import NavbarAdmin from "@/app/components/NavbarAdmin";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function PhotoAdmin() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [isAddPhotos, setAddPhotos] = useState(false);
    const [newPhoto, setNewPhoto] = useState({ nama: "", deskripsi: "", image: null });
    const [editPhoto, setEditPhoto] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            setIsAuthenticated(true);
            fetchPhotos(token, currentPage);
        } else {
            setIsAuthenticated(false);
            window.location.href = "/auth/login";
        }

        setLoading(false);
    }, [currentPage]);

    const fetchPhotos = async (token, page = 1) => {
        try {
            const response = await fetch(`https://bimaryan.serv00.net/api/photo?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setPhotos(data.photos);
                setCurrentPage(data.current_page);
                setTotalPages(data.total_pages);
            } else {
                console.error("Failed to fetch photos");
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    const deletePhoto = async (photoId) => {
        const token = localStorage.getItem("auth_token");
        try {
            const response = await fetch(`https://bimaryan.serv00.net/api/photo/${photoId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                Swal.fire("Deleted!", "Photo has been deleted.", "success");
                setPhotos(photos.filter((photo) => photo.id !== photoId));
            } else {
                Swal.fire("Error!", "Failed to delete photo.", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "An error occurred while deleting the photo.", "error");
        }
    };

    const handleDelete = (photoId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deletePhoto(photoId);
            }
        });
    };

    const handleAddPhoto = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("auth_token");

        try {
            const compressedImage = await imageCompression(newPhoto.image, {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            });

            const formData = new FormData();
            formData.append("nama", newPhoto.nama);
            formData.append("deskripsi", newPhoto.deskripsi);
            formData.append("image", compressedImage);

            const response = await fetch("https://bimaryan.serv00.net/api/photo", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setPhotos([...photos, data.photo]);
                Swal.fire("Success!", "Photo added successfully.", "success");
                setAddPhotos(false);
                setNewPhoto({ nama: "", deskripsi: "", image: null });
            } else {
                Swal.fire("Error!", "Failed to add photo.", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "An error occurred while adding the photo.", "error");
            console.error("Error compressing image:", error);
        }
    };

    const handleEditPhoto = (photo) => {
        setEditPhoto(photo);
    };

    const handleUpdatePhoto = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("auth_token");
        const formData = new FormData();
        formData.append("nama", editPhoto.nama);
        formData.append("deskripsi", editPhoto.deskripsi);
        if (editPhoto.image) {
            formData.append("image", editPhoto.image);
        }

        try {
            const response = await fetch(`https://bimaryan.serv00.net/api/photo/${editPhoto.photo}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setPhotos(photos.map(photo => (photo.id === data.photo.id ? data.photo : photo)));
                Swal.fire("Success!", "Photo updated successfully.", "success");
                setEditPhoto(null); // Close the modal after successful update
            } else {
                Swal.fire("Error!", "Failed to update photo.", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "An error occurred while updating the photo.", "error");
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            fetchPhotos(localStorage.getItem("auth_token"), page);
        }
    };

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
                        <div className="p-4 bg-white rounded-lg shadow-lg flex justify-between items-center">
                            <p className="text-lg font-semibold text-pink-500">Photo</p>
                            <button onClick={() => setAddPhotos(!isAddPhotos)} className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 transition duration-300">
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>

                        {/* Add Photo Modal */}
                        {isAddPhotos && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 p-4">
                                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Photo</h3>
                                    <form onSubmit={handleAddPhoto}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700">Photo Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="mt-2 p-2 w-full border text-pink-500 border-pink-500 rounded"
                                                value={newPhoto.nama}
                                                onChange={(e) => setNewPhoto({ ...newPhoto, nama: e.target.value })}

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-gray-700">Description (Optional)</label>
                                            <textarea
                                                id="description"
                                                className="mt-2 p-2 w-full border text-pink-500 border-pink-500 rounded"
                                                value={newPhoto.deskripsi}
                                                onChange={(e) => setNewPhoto({ ...newPhoto, deskripsi: e.target.value })}

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="image" className="block text-gray-700">Image</label>
                                            <input
                                                type="file"
                                                id="image"
                                                className="mt-2 border text-pink-500 border-pink-500 w-full p-2"
                                                onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.files[0] })}

                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                                                Add Photo
                                            </button>
                                            <button type="button" onClick={() => setAddPhotos(false)} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Edit Photo Modal */}
                        {editPhoto && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 p-4">
                                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Photo</h3>
                                    <form onSubmit={handleUpdatePhoto}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700">Photo Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="mt-2 p-2 w-full border text-pink-500 border-pink-500 rounded"
                                                value={editPhoto.nama}
                                                onChange={(e) => setEditPhoto({ ...editPhoto, nama: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-gray-700">Description (Optional)</label>
                                            <textarea
                                                id="description"
                                                className="mt-2 p-2 w-full border text-pink-500 border-pink-500 rounded"
                                                value={editPhoto.deskripsi || ''}
                                                onChange={(e) => setEditPhoto({ ...editPhoto, deskripsi: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="image" className="block text-gray-700">Image</label>
                                            <input
                                                type="file"
                                                id="image"
                                                className="mt-2 border text-pink-500 border-pink-500 w-full p-2"
                                                onChange={(e) => setEditPhoto({ ...editPhoto, image: e.target.files[0] })}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                                                Update Photo
                                            </button>
                                            <button type="button" onClick={() => setEditPhoto(null)} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {photos.map((photo) => (
                                <div key={photo.id} className="bg-white p-4 rounded-lg shadow-lg">
                                    <img
                                        src={photo.image_url}
                                        alt={photo.nama}
                                        className="w-full h-64 object-cover rounded-lg mb-2"
                                    />
                                    <div className="flex justify-between gap-2 items-center">
                                        <h4 className="font-medium text-m text-pink-500">{photo.nama}</h4>
                                        <p className="text-gray-500 text-sm">
                                            {format(new Date(photo.created_at), 'd MMMM yyyy', { locale: id })}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600">{photo.deskripsi}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            onClick={() => handleEditPhoto(photo)}
                                            className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(photo.id)}
                                            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
                            >
                                Previous
                            </button>
                            <span className="mx-4 self-center text-pink-500 text-lg">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
            </>
        )
    );
}
