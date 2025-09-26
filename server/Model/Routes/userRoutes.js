import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../controllers/UserController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

export default router;