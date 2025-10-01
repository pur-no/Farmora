// server/controllers/adminController.js
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Admins cannot delete their own account.' });
    }

    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.status(200).json({ success: true, message: 'User removed' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Get all products (admin)
 * @route   GET /api/admin/products
 * @access  Private/Admin
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('user', 'name email');
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

/**
 * @desc    Delete a product (admin)
 * @route   DELETE /api/admin/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.status(200).json({ success: true, message: 'Product removed' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};