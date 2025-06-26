import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get(`http://localhost:5000/api/blogs/id/${id}`)

      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blog:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, blog);
      alert("Blog updated!");
     navigate('/', { replace: true })
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white h-full">
      <h1 className="text-2xl font-normal uppercase text-center mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-normal">Title</label>
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-normal">Content</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            rows="8"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-normal">Published At</label>
          <input
            name="publishedAt"
            type="date"
            value={new Date(blog.publishedAt).toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[rgb(56,56,56)] text-white w-full "
        >
          SAVE
        </button>
      </form>
    </div>
  );
}
