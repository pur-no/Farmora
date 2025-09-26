import React, { useState } from "react";
import "../styles/Adminpage.css";
const AdminAboutPage = () => {
  const [content, setContent] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Handle content change
  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost({ ...newPost, image: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Handle post submission
  const handlePost = () => {
    setContent([...content, newPost]);
    setNewPost({ title: "", description: "", image: "" });
  };

  // Handle post deletion
  const handleDelete = (index) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  return (
    <div className="about-container">
      <div className="banner">
        <img src="path/to/your/theme-image.jpg" alt="Theme Banner" />
      </div>

      <section>
        <h2>Greetings</h2>
        <textarea
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Write a greeting or update here..."
        />
        <textarea
          name="description"
          value={newPost.description}
          onChange={handleChange}
          placeholder="Add a description..."
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button onClick={handlePost}>Post</button>
      </section>

      <div className="posted-sections">
        {content.map((post, index) => (
          <div className="post-card" key={index}>
            {post.image && <img src={post.image} alt="Post" />}
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>

      <footer>
        <p>&copy; 2025 Farm Management System</p>
      </footer>
    </div>
  );
};

export default AdminAboutPage;
