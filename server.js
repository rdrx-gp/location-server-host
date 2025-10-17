import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// ✅ This route will receive location
app.post("/receive-location", (req, res) => {
  const { lat, lon, acc, t } = req.body;
  console.log(`📍 Location received:
  Latitude: ${lat}
  Longitude: ${lon}
  Accuracy: ${acc}
  Time: ${new Date(t).toLocaleString()}`);

  res.send("Location received ✅");
});

// Test root route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

