// components/SocialLinksForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/social-links";

export default function SocialLinks() {
  const [links, setLinks] = useState({

    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",


  });

  useEffect(() => {
    axios.get(API_URL).then((res) => setLinks(res.data));
  }, []);

  const handleChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, links);
      alert("Social links updated!");
    } catch (error) {
      console.error("Error updating links:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl space-y-4 p-6 h-full bg-white ">
      <h2 className="text-2xl text-center font-normal mb-4 uppercase">Update Social Links</h2>

      {["instagram", "facebook", "youtube", "twitter"].map((platform) => (
        <div key={platform}>
          <label className="block mb-1 capitalize">{platform} URL</label>
          <input
            type="url"
            name={platform}
            placeholder={`Enter ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
            value={links[platform]}
            onChange={handleChange}
            className="w-full border px-3 py-2 text-gray-700 "
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-[rgb(56,56,56)] text-white px-4 py-2  w-full "
      >
        SAVE
      </button>
    </form>
  );
}
