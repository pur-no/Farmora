import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../styles/LocationTracking.css";

const LocationTracking = () => {
  const [riderLocation, setRiderLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.error("User location error", err)
    );
  }, []);

  useEffect(() => {
    const fetchRider = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/location");
        const data = await res.json();
        setRiderLocation(data);
      } catch (err) {
        console.error("Failed to get rider location", err);
      }
    };

    fetchRider();
    const interval = setInterval(fetchRider, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!userLocation || !riderLocation) return <div>Loading map...</div>;

  return (
    <div className="tracking-container">
      <h2>Farm Delivery Tracker</h2>
      <MapContainer
        center={[userLocation.latitude, userLocation.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="map-style"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>Your Location</Popup>
        </Marker>
        <Marker position={[riderLocation.latitude, riderLocation.longitude]}>
          <Popup>Farm Vehicle Location</Popup>
        </Marker>
      </MapContainer>
      <button onClick={goBack}>Back to Home</button>
    </div>
  );
};

export default LocationTracking;
