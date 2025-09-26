import React, { useEffect, useState } from 'react';
import '../styles/NotificationsPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((note, index) => (
          <div className={`notification ${note.type}`} key={index}>
            <strong>{note.title}</strong>
            <p>{note.message}</p>
          </div>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
