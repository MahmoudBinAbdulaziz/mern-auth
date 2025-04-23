import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_profile_uploads"); // 👈 from Cloudinary settings

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dz2mv1whv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageURL(data.secure_url);
      console.log("Image uploaded:", data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={uploadImage}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>

      {imageURL && (
        <div className="mt-4">
          <img src={imageURL} alt="Uploaded" className="w-48 h-auto" />
          <p className="text-sm mt-2 break-words">{imageURL}</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
