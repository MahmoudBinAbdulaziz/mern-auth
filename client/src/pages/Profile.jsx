import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [imageURL, setImageURL] = useState(currentUser.profilePicture);
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const handleImageClick = () => {
    fileInputRef.current.click(); // triggers file input click
  };

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_profile_uploads");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dz2mv1whv/image/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setImageURL(data.secure_url);
        setFormData({ ...formData, profilePicture: data.secure_url });
        setUploadProgress(0); // reset
        console.log("Uploaded image:", data.secure_url);
      } else {
        console.error("Upload failed:", xhr.responseText);
        setUploadProgress(0);
      }
    };

    xhr.onerror = () => {
      console.error("Upload error.");
      setUploadProgress(0);
    };

    xhr.send(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch("/api/v1/user/update/" + currentUser._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleSignOut = async () => {
    try {
      await fetch("/api/v1/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <img
          src={imageURL}
          alt="profile"
          onClick={handleImageClick}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 border-2 border-gray-400"
          title="Click to change profile picture"
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User is updated successfully!"}
      </p>
    </div>
  );
}
