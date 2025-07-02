import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api
      .get('user/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        // Remove duplicates by _id
        const uniqueUsers = Array.from(
          new Map(res.data.map(user => [user._id, user])).values()
        );
        setUsers(uniqueUsers);
      })
      .catch(err => {
        console.error('Failed to fetch users', err);
        setError('Failed to fetch users');
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white h-full">
      <h1 className="text-2xl font-normal text-center mb-8 mt-4">ALL USERS</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left uppercase">Name</th>
              <th className="px-4 py-2 text-left uppercase">Email</th>
              <th className="px-4 py-2 text-left uppercase">Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
