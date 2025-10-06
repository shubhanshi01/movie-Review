import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/v1/reviews", reviews);

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
