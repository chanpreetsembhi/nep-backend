import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
});

const collectionSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, unique: true },
    document: [docSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subject", collectionSchema);
