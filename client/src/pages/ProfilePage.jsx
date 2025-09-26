// client/src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-128px)] bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center">
          {/* Profile Picture Placeholder */}
          <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-4xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="mt-2 text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            User Details
          </h3>
          <dl className="divide-y divide-gray-200">
            <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
            </div>
            <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="py-3 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Account Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.role}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;