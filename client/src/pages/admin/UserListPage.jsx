// client/src/pages/admin/UserListPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import AuthContext from '../../context/AuthContext'; // Import AuthContext

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: adminUser } = useContext(AuthContext); // Get the logged-in admin's info

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/users');
        if (data.success) {
          setUsers(data.data);
        }
      } catch (err) {
        toast.error('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userIdToDelete) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      const deletePromise = axios.delete(`/api/admin/users/${userIdToDelete}`);

      toast.promise(deletePromise, {
        loading: 'Deleting user...',
        success: () => {
          setUsers(users.filter((user) => user._id !== userIdToDelete));
          return <b>User deleted successfully!</b>;
        },
        error: (err) => <b>{err.response?.data?.message || 'Could not delete user.'}</b>,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-128px)] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Manage Users
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">User ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs">{user._id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {/* Disable button if the user is the currently logged-in admin */}
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="font-medium text-red-600 hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                      disabled={user._id === adminUser._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;