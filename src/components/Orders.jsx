import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllOrders = async () => {
            const token = localStorage.getItem('token'); // should be admin's token

            try {
                const res = await axios.get('http://localhost:5000/api/orders/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading orders...</div>;
    if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white h-full">
            <h2 className="text-2xl font-normal text-center mb-8 mt-4 uppercase">All Orders</h2>


            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left uppercase">Order ID</th>
                                <th className="px-4 py-2 text-left uppercase">User</th>
                                <th className="px-4 py-2 text-left uppercase">Email</th>
                                <th className="px-4 py-2 text-left uppercase">Total</th>
                                <th className="px-4 py-2 text-left uppercase">Status</th>
                                <th className="px-4 py-2 text-left uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{order._id}</td>
                                    <td className="px-4 py-2">{order.user?.firstName} {order.user?.lastName}</td>
                                    <td className="px-4 py-2">{order.user?.email}</td>
                                    <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-4 py-2">{order.status}</td>
                                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
