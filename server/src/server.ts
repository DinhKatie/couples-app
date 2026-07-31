import "dotenv/config";
import express from "express";
import cors from "cors";
import pairingRouter from "./routes/pairingRoutes.js";
import notesRouter from "./routes/notesRoutes.js";
import moodRouter from "./routes/moodRoutes.js";


// Check for valid environment variables
const requiredEnvVars = ["SUPABASE_URL", "SUPABASE_SECRET_KEY"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Error: Missing required environment variable ${envVar}`);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("Hello, World!");
});

app.use("/pairing", pairingRouter);
app.use("/notes", notesRouter);
app.use("/mood", moodRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});