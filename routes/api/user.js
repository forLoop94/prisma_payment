import { Router } from "express";
import upload from "../../middlewares/multer.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUsersPaginated,
  updateUser,
  userImageUpload,
} from "../../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/paginated", getUsersPaginated);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/image_upload", upload.single("image"), userImageUpload);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
