import express from "express";
import {
  addTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
} from "../app/controllers/topicController.js";

const router = express.Router();

// Get All Topics
router.get("/subjects/:subjectId/topics", getTopics);

// Get Single Topic
router.get("/subjects/:subjectId/topic/:topicId", getTopic);

// Add Topic
router.post("/subjects/:subjectId/topics", addTopic);

// Update Topic
router.put("/subjects/:subjectId/topic/:topicId", updateTopic);

// Delete Topic
router.delete("/subjects/:subjectId/topic/:topicId", deleteTopic);

export default router;
