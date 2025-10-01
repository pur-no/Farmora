// server/controllers/productController.js
import Product from '../models/productModel.js';

/**
 * @desc    Get all products with search, filter, and pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const pageSize = 8; // Number of products per page
    const page = Number(req.query.pageNumber) || 1;

    const { keyword, category } = req.query;
    const query = {};

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: 'i', // 'i' for case-insensitivity
      };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      success: true,
      data: products,
      page,
      pages: Math.ceil(count / pageSize), // Total number of pages
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private
 */
export const newProduct = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private
 */
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    if (product.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this product' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    if (product.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ success: false, message: 'Not authorized to delete this product' });
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Get products for the logged-in user
 * @route   GET /api/products/myproducts
 * @access  Private
 */
export const getMyProducts = async (req, res) => {
    try {
      const products = await Product.find({ user: req.user._id });
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };