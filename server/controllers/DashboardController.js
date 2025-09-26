import Task from "../Model/models/taskModel.js";
import Product from "../Model/models/productModel.js"; 
import User from "../Model/models/userModel.js"; 
import Notification from "../Model/models/notificationModel.js"; 
import Activity from "../Model/models/activityModel.js"; 
import Expense from "../Model/models/expenseModel.js"; 

export const getDashboardStats = async (req, res) => {
  try {
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const totalProducts = await Product.countDocuments();
    const lowInventoryCount = await Product.countDocuments({ quantity: { $lt: 5 } });
    const totalUsers = await User.countDocuments();
    const expenses = await Expense.find(); 

    
    const otherStats = {
      totalRevenue: 10000, 
      totalExpenses: 5000, 
    };

    res.json({
      ...otherStats,
      pendingTasks,
      totalProducts,
      lowInventoryCount,
      totalUsers,
      expenses: expenses.length > 0 ? expenses : null,
      notifications: [
        "Low inventory for Wheat",
        "Task overdue: Irrigation",
      ],
      recentActivities: [
        "Product added: Apple",
        "Task completed: Harvest",
      ],
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};