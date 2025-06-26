import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BannerEditor() {
  const [banner, setBanner] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(res => {
        setBanner(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    
      setBanner(prev => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/banner', banner);
      alert('Banner updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update banner.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 pl-8  bg-white shadow-md space-y-6">
        <h1 className="text-2xl font-normal mt-2 text-center mb-8">UPLOAD BANNER</h1>
      <input
        name="subtitle"
        value={banner.subtitle}
        onChange={handleChange}
        placeholder="Subtitle"
        className="w-full p-2 border"
      />
      <input
        name="title"
        value={banner.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        value={banner.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border"
      />

      <div className='bg-opacity-15 bg-yellow-100' >
      
        <label className="block mb-1">Upload Image</label>
        <input type="file" onChange={handleFileChange} className="w-full " />
        {uploading && <p>Uploading...</p>}
        {banner.image && (
          <div className="mt-2">
            <img src={banner.image} alt="Banner Preview" className="h-40 object-cover rounded" />
          </div>
        )}
      </div>

      <button type="submit" className="bg-[rgb(56,56,56)] text-white px-4 py-2 w-full">Save Banner</button>
    </form>
  );
}
