import Subjects from "../models/collection.model.js";

// Get All Topics
export const getTopics = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subjectData = await Subjects.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({
      message: "Topics fetched successfully",
      subject: subjectData.subject,
      topics: subjectData.document || [],
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching topics", details: error.message });
  }
};

// Get Single Topic
export const getTopic = async (req, res) => {
  try {
    const { subjectId, topicId } = req.params;

    const subjectData = await Subjects.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const topicData = subjectData.document.find(
      (doc) => doc._id.toString() === topicId
    );

    if (!topicData) {
      return res.status(404).json({ message: "Topic not found" });
    }

    return res.status(200).json({
      message: "Topic fetched successfully",
      subject: subjectData.subject,
      topic: topicData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching topic", details: error.message });
  }
};

// Add Topic
export const addTopic = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const topicData = req.body;

    const subjectData = await Subjects.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Add new topic to document array
    subjectData.document.push(topicData);
    await subjectData.save();

    // Get the newly added topic
    const newTopic = subjectData.document[subjectData.document.length - 1];

    return res.status(201).json({
      message: "Topic added successfully",
      topic: newTopic,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error adding topic", details: error.message });
  }
};

// Update Topic
export const updateTopic = async (req, res) => {
  try {
    const { subjectId, topicId } = req.params;
    const updateData = req.body;

    const subjectData = await Subjects.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const topicIndex = subjectData.document.findIndex(
      (doc) => doc._id.toString() === topicId
    );

    if (topicIndex === -1) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Update the topic
    Object.assign(subjectData.document[topicIndex], updateData);
    await subjectData.save();

    return res.status(200).json({
      message: "Topic updated successfully",
      topic: subjectData.document[topicIndex],
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error updating topic", details: error.message });
  }
};

// Delete Topic
export const deleteTopic = async (req, res) => {
  try {
    const { subjectId, topicId } = req.params;

    const subjectData = await Subjects.findById(subjectId);

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const topicIndex = subjectData.document.findIndex(
      (doc) => doc._id.toString() === topicId
    );

    if (topicIndex === -1) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Remove the topic
    subjectData.document.splice(topicIndex, 1);
    await subjectData.save();

    return res.status(200).json({
      message: "Topic deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error deleting topic", details: error.message });
  }
};