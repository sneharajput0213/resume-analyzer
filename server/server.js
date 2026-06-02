require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express(); 

app.use(cors());
app.use(express.json());

console.log("Supabase Client Initialized ✅ (Ready to insert)");

// Routes
const uploadRoutes = require("./routes/uploadRoutes");
const verifyRoutes = require("./routes/verifyRoutes");

app.use("/api", uploadRoutes);
app.use("/api", verifyRoutes); 

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});