import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collation: "admin",
  },
);

export default mongoose.model("Admin", adminSchema);
