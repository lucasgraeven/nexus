import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Start server
app.listen(PORT, async () => {
  await initDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
