import express from "express";
import axios from "axios";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Backend-A running successfully 😃!" });
});

// This endpoint calls Backend-B to gather additional info.
app.get("/call-backend-b", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_B}`);
    res.json({
      backend_a_message: "Backend-A calling Backend-B",
      backend_b_data: response.data,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend-A listening on http://0.0.0.0:${port}`);
});
