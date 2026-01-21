import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubject,
  getSubjects,
  updateSubject,
} from "../app/controllers/collectionController.js";

const router = express.Router();

// Get All Subjects
router.get("/subjects", getSubjects);

// Get Single Subject
router.get("/subjects/:id", getSubject);

// Add Subject
router.post("/subjects", createSubject);

// Update Subject
router.put("/subjects/:id", updateSubject);

// Delete Subject
router.delete("/subjects/:id", deleteSubject);

export default router;
