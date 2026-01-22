import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "../src/routes/admin.js";
import collectionRoutes from "../src/routes/collection.js";
import topicRoutes from "../src/routes/topic.js";
import Subject from "../src/app/models/collection.model.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "nep",
  })
  .then(async () => {
    console.log("✅ Connect to MongoDB Atlas");

    try {
      await Subject.syncIndexes();
      console.log("✅ Indexes synced successfully");
    } catch (error) {
      console.log("⚠️ Error syncing indexes:", error);
    }

    const app = express();

    app.use(
      cors({
        origin: ["https://nep-dash.vercel.app", "http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", collectionRoutes);
    app.use("/api", topicRoutes);
    app.use("/api/admin", adminRoutes);

    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((error) => {
    console.log("❌ Failed to connect to MongoDB Atlas", error);
  });
