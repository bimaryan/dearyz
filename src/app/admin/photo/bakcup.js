    // const handleAddPhoto = async (e) => {
    //     e.preventDefault();
    //     const token = localStorage.getItem("auth_token");
    //     const formData = new FormData();
    //     formData.append("nama", newPhoto.nama);
    //     formData.append("deskripsi", newPhoto.deskripsi);
    //     formData.append("image", newPhoto.image);

    //     try {
    //         const response = await fetch("https://bimaryan.serv00.net/api/photo", {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setPhotos([...photos, data.photo]);
    //             Swal.fire("Success!", "Photo added successfully.", "success");
    //             setAddPhotos(false);
    //             setNewPhoto({ nama: "", deskripsi: "", image: null });
    //         } else {
    //             Swal.fire("Error!", "Failed to add photo.", "error");
    //         }
    //     } catch (error) {
    //         Swal.fire("Error!", "An error occurred while adding the photo.", "error");
    //     }
    // };