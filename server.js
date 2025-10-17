import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow requests from anywhere (especially your GitHub Pages site)
app.use(cors());
app.use(bodyParser.json());

// ✅ This route will receive location data from the webpage
app.post("/receive-location", (req, res) => {
  const { lat, lon, acc, time, source } = req.body;

  console.log("📍 Location received:");
  console.log("Latitude:", lat);
  console.log("Longitude:", lon);
  console.log("Accuracy:", acc);
  console.log("Time:", new Date(time).toLocaleString());
  console.log("Source:", source);

  res.status(200).send("Location received ✅");
});

// ✅ Root route for Render check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

