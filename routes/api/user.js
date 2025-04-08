import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUsersPaginated,
  updateUser,
} from "../../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/paginated", getUsersPaginated);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.get("/paginated", (req, res) => {
//   res.status(201).json({ message: "Get request suvccesful" });
// });

export default router;
