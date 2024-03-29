import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  resetPassword,
  getFilteredUsers,
} from "../controllers/userController.js";
import {
  protect,
  admin,
  activeUserCheck,
} from "../middleware/authMiddleware.js";

router.post("/create", protect, admin, createUser);
router.get("/filter", getFilteredUsers);
router.post("/resetPassword", protect, admin, resetPassword);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(activeUserCheck, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
