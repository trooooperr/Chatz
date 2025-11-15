import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Fix dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ENV
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 👉 Serve Frontend (Vite build)
const frontendDistPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});