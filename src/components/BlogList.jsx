import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/blogs", {
      headers: {
        Authorization: `Bearer ${token}`, // Add token here
      },
    })
    .then(res => {
      setBlogs(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching blogs:", err);
      setLoading(false);
    });
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token here too
        },
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog");
    }
  };

  const handleEdit = (id) => {
    navigate(`/blogEdit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white h-full">
      <h1 className="text-2xl font-normal text-center mb-8">MANAGE BLOGS</h1>
      <table className="w-full text-left table-fixed border-collapse border border-gray-300 ">
        <thead>
          <tr>
            <th className="w-1/2 border border-gray-300 font-normal px-4 py-2">Title</th>
            <th className="border w-1/4 border-gray-300 font-normal px-4 py-2">Published At</th>
            <th className="border w-1/4 border-gray-300 font-normal px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr className=" text-gray-600  " key={blog._id}>
              <td className="border border-gray-300   px-4 py-2 uppercase">{blog.title}</td>
              <td className="border border-gray-300  px-4 py-2">{new Date(blog.publishedAt).toLocaleDateString()}</td>
              <td className="border border-gray-300  px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="px-3 py-1 bg-blue-600 text-white  hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 text-white  hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
