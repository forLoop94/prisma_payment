import { Router } from "express";
import {
  getAllMaterials,
  getMaterial,
} from "../../controllers/studyMaterialsController.js";

const router = Router();

router.get("/", getAllMaterials);
router.get("/:id", getMaterial);

export default router;
