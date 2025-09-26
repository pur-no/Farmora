// filepath: c:\Users\Asus\Farm-Management-System\View\src\api\fetchProducts.js
import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;