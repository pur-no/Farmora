import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminFarmPanel.css";

const AdminFarmPanel = () => {
  const [farms, setFarms] = useState([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFarms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/farms");
      setFarms(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch farms.");
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleAddFarm = async (e) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      setError("Please provide both name and image URL.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/farms", { name, image: imageUrl });
      setName("");
      setImageUrl("");
      setError("");
      fetchFarms(); // Refresh the list
    } catch (err) {
      console.error(err);
      setError("Failed to add farm.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFarm = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/farms/${id}`);
      fetchFarms();
    } catch (err) {
      console.error(err);
      setError("Failed to delete farm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Farm Panel</h2>

      <form className="add-farm-form" onSubmit={handleAddFarm}>
        <input
          type="text"
          placeholder="Farm Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="add-button" disabled={loading}>
          {loading ? "Adding..." : "Add Farm"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="farm-list-admin">
        <h3>Current Farms</h3>
        <div className="farm-items-admin">
          {farms.map((farm) => (
            <div key={farm._id} className="farm-card-admin">
              <img src={farm.image} alt={farm.name} />
              <p>{farm.name}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteFarm(farm._id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFarmPanel;
