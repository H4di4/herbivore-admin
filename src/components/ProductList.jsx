import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      console.log('Fetched products:', res.data);
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log('Deleting product with id:', id);
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      console.log('Delete response:', response.data);
      toast.success('Product deleted');


      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="overflow-x-auto  max-w-7xl mx-auto bg-white shadow ">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 border-b text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">On sale</th>

            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Best Seller</th>
            <th className="px-4 py-3">Filters</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (

            <tr key={product._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium">{product.name}</td>

              {/* Price */}
              <td className="px-4 py-3">${product.price.toFixed(2)}</td>

              {/* Discount Price */}
              <td className="px-4 py-3">
                {product.discountPrice
                  ? `$${product.discountPrice.toFixed(2)}`
                  : '—'}
              </td>

              {/* On Sale */}
              <td className="px-4 py-3">
                {product.onSale ? 'Yes' : 'No'}
              </td>

              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3">{product.rating}</td>
              <td className="px-4 py-3">{product.isBestSeller ? 'Yes' : 'No'}</td>
              <td className="px-4 py-3">
                <div><strong>Age:</strong> {product.filters?.age || '—'}</div>
                <div><strong>Skin Types:</strong> {product.filters?.skinTypes?.join(', ') || '—'}</div>
                <div><strong>Concerns:</strong> {product.filters?.skinConcerns?.join(', ') || '—'}</div>
              </td>
              <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1 bg-blue-700 text-white text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 bg-red-700 text-white text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
