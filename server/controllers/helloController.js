// server/controllers/helloController.js

/**
 * @desc    Sends a simple JSON response
 * @route   GET /api/hello
 * @access  Public
 */
export const sayHello = (req, res) => {
  res.status(200).json({ message: 'Hello from the Farmora API!' });
};