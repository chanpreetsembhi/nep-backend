// adminRoutes.js
import express from "express";
import { loginAdmin, getAdmin } from "../app/controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/:id", getAdmin);

export default router;
