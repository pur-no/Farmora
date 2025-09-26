// client/src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <strong>Name:</strong>
          <span>{user.name}</span>
        </div>
        <div className="profile-info">
          <strong>Email:</strong>
          <span>{user.email}</span>
        </div>
        <div className="profile-info">
          <strong>Role:</strong>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;