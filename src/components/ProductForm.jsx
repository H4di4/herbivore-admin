import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialForm = {
    id: null,
    name: '',
    price: '',
    discountPrice: '',
    onSale: false,
    rating: 0,
    description: '',
    category: '',
    isBestSeller: false,
    howToUse: '',
    ingredients: '',
    imageUrl: [],
    filters: {
        age: '',
        skinTypes: [],
        skinConcerns: [],
    },
};

const skinTypes = ['Dry', 'Normal', 'Combination', 'Oily'];
const skinConcerns = ['Acne', 'Anti-Aging', 'Dark Spots', 'Dryness', 'Dullness', 'Oiliness', 'Pores', 'Sensitivity'];
const categories = [
    'Serums',
    'Oils',
    'Cleansers',
    'Eye Creams',
    'Moisturizers',
    'Lip',
    'Scrubs',
    'Body Moisturizers',
    'Soaps',
    'Bath + Body',
    'Fine Lines',
    'Dullness',
    'Dryness',
    'Acne',
    'Redness',
    'New',
    'Sets',
    'All'
]


const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45+'];

export default function ProductForm({ onSubmit, editing = false, currentProduct = null }) {
    const [form, setForm] = useState(initialForm);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editing && currentProduct) {
            setForm({
                ...initialForm,
                ...currentProduct,
                filters: {
                    ...initialForm.filters,
                    ...currentProduct.filters,
                },
            });
        }
    }, [editing, currentProduct]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('filters.')) {
            const filterName = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                filters: {
                    ...prev.filters,
                    [filterName]: value,
                },
            }));
        } else if (type === 'checkbox') {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else if (name === 'rating') {
            setForm((prev) => ({ ...prev, rating: Number(value) }));
        } else if (name === 'price' || name === 'discountPrice') {
            setForm((prev) => ({ ...prev, [name]: Number(value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };


    const toggleFilter = (type, value) => {
        setForm((prev) => {
            const values = prev.filters[type];
            return {
                ...prev,
                filters: {
                    ...prev.filters,
                    [type]: values.includes(value)
                        ? values.filter((v) => v !== value)
                        : [...values, value],
                },
            };
        });
    };

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files.length) return;

        setUploading(true);

        try {
            const uploadedUrl = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const res = await axios.post('http://localhost:5000/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                uploadedUrl.push(res.data.imageUrl);
            }

            // Append new uploaded URLs to existing ones
            setForm((prev) => ({
                ...prev,
                imageUrl: [...prev.imageUrl, ...uploadedUrl],
            }));

            toast.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.price || !form.category) {
            toast.error('Please fill out all required fields (Name, Price, Category).');
            return;
        }

        try {
            // Send POST request to add product
            const response = await axios.post('http://localhost:5000/api/products', {
                ...form,
                price: Number(form.price),
                discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
            });

            toast.success('Product added successfully!');

            // Reset form after successful submission if not editing
            if (!editing) {
                setForm(initialForm);
            }

            // Optionally, you can do something with response.data here

        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('Failed to add product. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white px-6 py-8 m-1 shadow-lg  max-w-6xl mx-auto text-lg">
              <h1 className="text-2xl font-normal text-center mb-8">ADD PRODUCT</h1>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input w-full max-w-xl px-2 py-1.5 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                        required
                        placeholder="Enter product name"
                    />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price *</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="input w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                            min="0"
                            step="0.01"
                            required
                            placeholder="Enter price"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Discount Price</label>
                        <input
                            type="number"
                            name="discountPrice"
                            value={form.discountPrice}
                            onChange={handleChange}
                            className="input w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                            min="0"
                            step="0.01"
                            placeholder="Enter discounted price"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category *</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="input w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                            required
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className="resize-none input w-full max-w-xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                        placeholder="Brief product description"
                    />
                </div>

                {/* How to Use */}
                <div>
                    <label className="block text-sm font-medium mb-1">How to Use</label>
                    <textarea
                        name="howToUse"
                        value={form.howToUse}
                        onChange={handleChange}
                        rows={2}
                        className="resize-none input w-full max-w-xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                        placeholder="Instructions for use"
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block text-sm font-medium mb-1">Ingredients</label>
                    <textarea
                        name="ingredients"
                        value={form.ingredients}
                        onChange={handleChange}
                        rows={2}
                        className="resize-none input w-full max-w-xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                        placeholder="List ingredients"
                    />
                </div>

                {/* Filters - Age */}
                <div>
                    <label className="block text-sm font-medium mb-1">Age Range</label>
                    <select
                        name="filters.age"
                        value={form.filters.age}
                        onChange={handleChange}
                        className="input w-full max-w-xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                        <option value="">Select age range</option>
                        {ageRanges.map((age) => (
                            <option key={age} value={age}>
                                {age}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filters - Skin Types */}
                <div>
                    <label className="block text-sm font-medium mb-2">Skin Types</label>
                    <div className="flex flex-wrap gap-4 max-w-xl">
                        {skinTypes.map((type) => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={form.filters.skinTypes.includes(type)}
                                    onChange={() => toggleFilter('skinTypes', type)}
                                    className="w-5 h-5 cursor-pointer rounded-none"
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filters - Skin Concerns */}
                <div>
                    <label className="block text-sm font-medium mb-2">Skin Concerns</label>
                    <div className="flex flex-wrap gap-4 max-w-xl">
                        {skinConcerns.map((concern) => (
                            <label key={concern} className="flex items-center space-x-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={form.filters.skinConcerns.includes(concern)}
                                    onChange={() => toggleFilter('skinConcerns', concern)}
                                    className="w-5 h-5 cursor-pointer rounded-none "
                                />
                                <span>{concern}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Best Seller */}
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={form.isBestSeller}
                        onChange={handleChange}
                        className="w-5 h-5 cursor-pointer"
                        id="bestSellerCheckbox"
                    />
                    <label htmlFor="bestSellerCheckbox" className="text-lg font-medium cursor-pointer select-none">
                        Best Seller
                    </label>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        name="onSale"
                        checked={form.onSale}
                        onChange={handleChange}
                        className="w-5 h-5 cursor-pointer"
                        id="onSaleCheckbox"
                    />
                    <label htmlFor="onSaleCheckbox" className="text-lg font-medium cursor-pointer select-none">
                        On Sale
                    </label>
                </div>


                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="input max-w-xl"
                        disabled={uploading}
                    />
                    {uploading && <p className="text-sm mt-2 text-gray-500">Uploading...</p>}
                    <div className="mt-4 flex flex-wrap gap-4">
                        {form.imageUrl.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Product Preview ${idx + 1}`}
                                className="w-40 h-40 object-cover  shadow-md border border-gray-200"
                            />
                        ))}
                    </div>

                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <select
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        className="input w-full max-w-xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                        {[0, 1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>
                                {rate} Star{rate !== 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[rgb(0,0,0)] text-white py-1 px-4 text-[15px] transition font-normal"
                >
                    {editing ? 'Update Product' : 'Add Product'}
                </button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}
