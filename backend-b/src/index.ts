import express from "express";
import axios from "axios";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Backend-B running successfully 😃!" });
});

// This endpoint calls Backend-A to fetch additional details.
app.get("/call-backend-a", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_A}`);
    res.json({
      backend_b_message: "Backend-B calling Backend-A",
      backend_a_data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend-B listening on http://0.0.0.0:${port}`);
});
