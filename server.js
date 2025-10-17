// server.js - simple location receiver + getter
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// in-memory last location (replace with DB if needed)
let lastLocation = { lat: null, lon: null, acc: null, time: null, source: null };

app.post("/receive-location", (req, res) => {
  const { lat, lon, acc, t, source } = req.body;
  if (typeof lat !== "number" || typeof lon !== "number") {
    return res.status(400).json({ error: "lat and lon must be numbers" });
  }
  lastLocation = { lat, lon, acc: acc ?? null, time: t ?? Date.now(), source: source ?? "web" };
  console.log("Received location:", lastLocation);
  return res.json({ status: "ok" });
});

app.get("/get-location", (req, res) => {
  if (lastLocation.lat === null) return res.status(204).send(); // no content yet
  return res.json(lastLocation);
});

app.get("/", (req, res) => res.send("Location server running"));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
