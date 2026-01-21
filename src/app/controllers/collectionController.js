import Subjects from "../models/collection.model.js";

// Get All Subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subjects.find().sort({ createdAt: -1 });
    return res.status(200).json({ subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Fetching Subjects" });
  }
};

// Get Subject By ID
export const getSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subjects.findById(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({ data: subject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching Subject" });
  }
};

// Create Subject
export const createSubject = async (req, res) => {
  try {
    const { subject, document } = req.body;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    // Check if collection already exists
    const existingSubject = await Subjects.findOne({ subject });
    if (existingSubject) {
      return res.status(409).json({ message: "Subject already exists" });
    }

    const subjects = new Subjects({
      subject,
      document: document || [],
    });

    const savedSubject = await subjects.save();

    return res.status(201).json({
      message: "Subject created successfully",
      data: savedSubject,
    });
  } catch (error) {
    console.error("Create Subject Error:", error);
    return res.status(500).json({
      error: "Error creating Subject",
      details: error.message,
      code: error.code,
    });
  }
};

// Update / Edit Collection
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, document } = req.body;

    const updatedSubject = await Subjects.findByIdAndUpdate(
      id,
      { subject, document },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({
      message: "Subject updated successfully",
      data: updatedSubject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating Subject" });
  }
};

// Delete Subject
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubject = await Subjects.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Subject deleted failed" });
  }
};
